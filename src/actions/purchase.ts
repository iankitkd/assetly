"use server";

import { getAssetDetails } from "@/actions/asset";
import { auth } from "@/auth";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

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

export const createPurchaseForFreeItem = async (assetId: string) => {
  try {
    // authorise
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    // find asset
    const {asset} = await getAssetDetails(assetId);
    if(!asset) {
      return { success: false, message: "Asset not found" };
    }

    if(asset.price !== 0) {
      return { success: false, message: "Asset is not free" };
    }

    // create order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: 0,
        status: "PAID",
        items: {
          create: {
            assetId: assetId,
            price: 0,
          },
        },
      },
      include: { items: true },
    });

    // create purchase
    await prisma.purchase.create({
      data: {
        userId,
        assetId,
        price: 0,
      },
    });

    return { success: true, message: "Purchase created" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}

export const getPurchase = async ({assetId, userId,}: {assetId: string; userId: string;}) => {
  return await prisma.purchase.findFirst({
    where: { assetId, userId },
    include: { asset: true },
  });
};

export async function getRecentPurchasedAssets(userId: string) {
  const purchases = await prisma.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      asset: {
        select: {
          id: true,
          title: true,
          price: true,
          category: true,
          salesCount: true,
          previewUrl: true,
        },
      },
    },
  });

  return purchases.map((p) => p.asset);
}


const PAGE_SIZE = 10;

export async function getUserLibrary(page: number, take: number = PAGE_SIZE) {
  const session = await auth();
  const userId = session?.user.id;

  const skip = (page - 1) * PAGE_SIZE;

  const [purchases, total] = await prisma.$transaction([
    prisma.purchase.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        asset: {
          select: {
            id: true,
            title: true,
            price: true,
            category: true,
            previewUrl: true,
            fileUrl: true,
            createdAt: true,
          },
        },
      },
    }),

    prisma.purchase.count({
      where: { userId },
    }),
  ]);

  return {
    purchases,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export const getBuyerStats = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return {
      assetsOwned: 0,
      totalSpent: 0,
    };
  }

  const purchaseStats = await prisma.purchase.aggregate({
    where: {
      userId: user.id,
    },
    _count: {
      id: true, // number of assets owned
    },
    _sum: {
      price: true, // total money spent
    },
  });

  return {
    assetsOwned: purchaseStats._count.id ?? 0,
    totalSpent: purchaseStats._sum.price ?? 0,
  };
};
