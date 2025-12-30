import { prisma } from "@/lib/prisma";

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
    },
  });
}
