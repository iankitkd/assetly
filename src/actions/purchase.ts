"use server"

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const createPurchaseForFreeItems = async () => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    // get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id, asset: { price: 0 } },
      include: { asset: true },
    });

    if (cartItems.length == 0) {
      return { success: false, message: "No free asset in cart found" };
    }

    // create order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: 0,
        status: "PAID",
        items: {
          create: cartItems.map((item) => ({
            assetId: item.assetId,
            price: item.asset.price,
          })),
        },
      },
      include: { items: true },
    });

    // create purchase
    await prisma.purchase.createMany({
      data: order.items.map((i) => ({
        userId: userId,
        assetId: i.assetId,
        price: 0,
      })),
    });
    
    const assetIds = order.items.map((el) => el.assetId);

    // delete cart
    await prisma.cartItem.deleteMany({
      where: { userId: userId, assetId: { in: assetIds } },
    });

    return { success: true, message: "Purchase created" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
};


export const getPurchase = async ({assetId, userId}: {assetId: string, userId: string}) => {
  return await prisma.purchase.findFirst({
    where: { assetId, userId },
    include: { asset: true },
  });
}