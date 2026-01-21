import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

export const getUserLibrary = async (
  userId: string,
  page: number,
  take: number = PAGE_SIZE
) => {
  const skip = (page - 1) * take;

  const [purchases, total] = await Promise.all([
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
    totalPages: Math.ceil(total / take),
  };
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

export interface BuyerStats {
  assetsOwned: number;
  totalSpent: number;
}

export const getBuyerStatsService = async (userId: string): Promise<BuyerStats> => {
  const purchaseStats = await prisma.purchase.aggregate({
    where: {
      userId,
    },
    _count: {
      id: true,
    },
    _sum: {
      price: true,
    },
  });

  return {
    assetsOwned: purchaseStats._count.id ?? 0,
    totalSpent: purchaseStats._sum.price ?? 0,
  };
};