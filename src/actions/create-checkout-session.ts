"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export async function createCheckoutSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
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
    payment_method_types: ["card", "amazon_pay", "paypal"],
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.asset.title },
        unit_amount: item.asset.price * 100,
      },
      quantity: 1,
    })),
    metadata: {
      orderId: order.id,
    },
    success_url: `${APP_URL}/checkout/success`,
    cancel_url: `${APP_URL}/cart`,
  });

  // 3️. Store Stripe Session ID
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSession: checkoutSession.id },
  });

  return checkoutSession.url;
}
