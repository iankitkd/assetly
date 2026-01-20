import { prisma } from "@/lib/prisma";

export async function createFreeAssetPurchase(
  userId: string,
  asset: {
    id: string;
    price: number;
  }
) {
  // check price
  if (asset.price !== 0) {
    throw new Error("Asset is not free");
  }

  const [order, _] = await prisma.$transaction(async (tx) => {
    // create order
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount: 0,
        status: "PAID",
        items: {
          create: {
            assetId: asset.id,
            price: 0,
          },
        },
      },
      include: { items: true },
    });

    // create purchase
    const purchase = await tx.purchase.create({
      data: {
        userId,
        assetId: asset.id,
        price: 0,
      },
    });

    return [order, purchase];
  });

  return order;
}

export const hasUserPurchasedAsset = async ( {userId, assetId}: {userId: string, assetId: string} ) => {
  return prisma.purchase.findUnique({
    where: {
      userId_assetId: {
        userId,
        assetId,
      },
    },
    select: {
      id: true,
      asset: {
        select: {
          id: true,
          fileUrl: true,
        }
      }
    }
  });
};