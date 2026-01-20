import { Prisma } from "@/generated/prisma/client";

type TxClient = Prisma.TransactionClient;

export async function finalizePaidOrder( tx: TxClient, orderId: string ) {
  // Update order status
  const order = await tx.order.update({
    where: { id: orderId },
    data: { status: "PAID" },
    select: {
      userId: true,
      items: {
        select: {
          assetId: true,
          price: true,
        },
      },
    },
  });

  // Create purchases
  await tx.purchase.createMany({
    data: order.items.map((item) => ({
      userId: order.userId,
      assetId: item.assetId,
      price: item.price,
    })),
  });

  // Duplicate assetIds
  const assetIds = order.items.map((i) => i.assetId);

  // Increment sales count
  await tx.asset.updateMany({
    where: { 
      id: { in: assetIds } 
    },
    data: {
      salesCount: { increment: 1 },
    },
  });

  // Clear cart
  await tx.cartItem.deleteMany({
    where: { userId: order.userId, assetId: {in: assetIds} },
  });

  return order;
}