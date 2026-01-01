import { prisma } from "@/lib/prisma";

export const getLatestAssets = async () => {
  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
  });
  return assets;
};
