"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const getCartItems = async () => {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.cartItem.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      asset: {
        select: {
          id: true,
          title: true,
          price: true,
          previewUrl: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};


export const addToCart = async (assetId: string) => {
  const session = await auth();
  const userId = session?.user.id;
  
  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  // Fetch asset
  const asset = await prisma.asset.findUnique({
    where: { id: assetId },
    select: {
      id: true,
      sellerId: true,
    },
  });

  if (!asset) {
    return { success: false, message: "Asset not found" };
  }

  // Prevent seller adding own asset
  if (asset.sellerId === userId) {
    return { success: false, message: "Own asset" };
  }

  // Prevent adding purchased asset
  const alreadyPurchased = await prisma.purchase.findFirst({
    where: {
      userId,
      assetId,
    },
  });

  if (alreadyPurchased) {
    return { success: false, message: "Already Purchased" };
  }

  // Add to cart
  await prisma.cartItem.upsert({
    where: {
      userId_assetId: {
        userId,
        assetId,
      },
    },
    update: {}, // nothing to update
    create: {
      userId,
      assetId,
    },
  });

  return { success: true, message: "Added to Cart" };
};


export const removeFromCart = async (assetId: string) => {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.cartItem.delete({
    where: {
      userId_assetId: {
        userId: session.user.id,
        assetId,
      },
    },
  });
};

export const getCartCount = async () : Promise<number> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return 0;

  return await prisma.cartItem.count({
    where: { userId: userId },
  });
}


export const mergeGuestCart = async (assetIds: string[]) => {
  const session = await auth();
  const userId = session?.user.id;

  if(!userId) return;

  await prisma.cartItem.createMany({
    data: assetIds.map((id) => ({
      userId,
      assetId: id,
    })),
    skipDuplicates: true,
  });
};