import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

export async function getSellerAssets(
  sellerId: string,
  page: number,
  take: number = PAGE_SIZE,
) {
  const skip = (page - 1) * PAGE_SIZE;

  const [assets, total] = await prisma.$transaction([
    prisma.asset.findMany({
      where: { sellerId },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      select: {
        id: true,
        title: true,
        category: true,
        price: true,
        salesCount: true,
        previewUrl: true,
      },
    }),

    prisma.asset.count({
      where: { sellerId },
    }),
  ]);

  return {
    assets,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
}

export async function getRecentAssetsBySeller(sellerId: string) {
  return prisma.asset.findMany({
    where: { sellerId },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      price: true,
      category: true,
      salesCount: true,
      previewUrl: true,
    },
  });
}


export const getSellerStats = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "SELLER") {
    return {
      totalAssets: 0,
      totalSales: 0,
      totalEarnings: 0,
    }
  }

  const [totalAssets, salesData] = await Promise.all([
    // Total assets uploaded by seller
    prisma.asset.count({
      where: {
        sellerId: user.id,
      },
    }),

    // Sales + earnings
    prisma.purchase.aggregate({
      where: {
        asset: {
          sellerId: user.id,
        },
        price: {
          gt: 0, // only paid purchases
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        price: true,
      },
    }),
  ])

  return {
    totalAssets,
    totalSales: salesData._count.id ?? 0,
    totalEarnings: salesData._sum.price ?? 0,
  }
}
