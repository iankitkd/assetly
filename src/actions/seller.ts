import { auth } from "@/auth";
import { getRecentUploadedAssets, getSellerAssets, getSellerStatsService } from "@/services/seller";

export const getMyAssets = async (page: number) => {
  const session = await auth();
  const sellerId = session?.user.id;

  if (!sellerId) {
    return { assets: [], total: 0, totalPages: 0 };
  }

  return getSellerAssets(sellerId, page);
};

export async function getMyRecentUploadedAssets() {
  const session = await auth();
  const sellerId = session?.user.id;

  if (!sellerId) {
    return [];
  }

  return getRecentUploadedAssets(sellerId);
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

  return getSellerStatsService(user.id);
}
