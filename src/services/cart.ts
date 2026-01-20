import { prisma } from "@/lib/prisma";

export const isAssetInUserCart = async ( {userId, assetId}: {userId: string, assetId: string} ) => {
  return prisma.cartItem.findUnique({
    where: {
      userId_assetId: {
        userId,
        assetId,
      },
    },
  });
};

export const addToCartService = async ( {userId, assetId}: {userId: string, assetId: string} ) => {
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

export const removeFromCartService = async ( {userId, assetId}: {userId: string, assetId: string} ) => {
  await prisma.cartItem.delete({
    where: {
      userId_assetId: {
        userId,
        assetId,
      },
    },
  });
};


export const getUserCartItems = async (userId: string) => {
  return prisma.cartItem.findMany({
    where: {
      userId,
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

export const getUserCartCount = async (userId: string) : Promise<number> => {
  return await prisma.cartItem.count({
    where: { userId: userId },
  });
}


export const mergeGuestCartService = async (userId: string, assetIds: string[]) => {
  // 1️. Get already purchased assets
  const purchasedAssets = await prisma.purchase.findMany({
    where: {
      userId,
      assetId: { in: assetIds },
    },
    select: { assetId: true },
  });

  const purchasedSet = new Set(
    purchasedAssets.map((p) => p.assetId)
  );

  // 2️. Remove purchased assets
  const validAssetIds = assetIds.filter(
    (id) => !purchasedSet.has(id)
  );

  if (validAssetIds.length === 0) return;

  // 3️. Add remaining to cart
  await prisma.cartItem.createMany({
    data: validAssetIds.map((id) => ({
      userId,
      assetId: id,
    })),
    skipDuplicates: true,
  });
};