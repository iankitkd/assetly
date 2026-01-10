"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function createCheckoutSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id, asset: {price: {gt: 0}} },
    include: { asset: true },
  });


  if (!cartItems.length) throw new Error("Cart empty");

  const total = cartItems.reduce((sum, i) => sum + i.asset.price, 0);

  // 1️. Create Order
  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      totalAmount: total,
      status: "PENDING",
      items: {
        create: cartItems.map((item) => ({
          assetId: item.assetId,
          price: item.asset.price,
        })),
      },
    },
  });

  // 2️. Create Stripe Checkout Session
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.asset.title, images: [item.asset.previewUrl] },
        unit_amount: item.asset.price * 100,
      },
      quantity: 1,
    })),
    metadata: {
      orderId: order.id,
      userId: session.user.id,
    },
    client_reference_id: session.user.id,
    customer_email: session.user.email ?? undefined,
    success_url: `${APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/cart`,
  });

  // 3️. Store Stripe Session ID
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSession: checkoutSession.id },
  });

  return checkoutSession.url;
}



export async function verifyStripeSession(sessionId: string) {
  const authSession = await auth();
  if (!authSession?.user) {
    throw new Error("Unauthorized");
  }

  if (!sessionId) {
    throw new Error("Missing session_id");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent"],
  });

  // 1️. Session must exist
  if (!session) {
    throw new Error("Invalid Stripe session");
  }

  // 2. User must match
  if (session.metadata?.userId !== authSession.user.id) {
    throw new Error("User mismatch");
  }

  // 3. Payment must be completed
  if (session.payment_status !== "paid") {
    throw new Error("Payment not completed");
  }

  return session;
}