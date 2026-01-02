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