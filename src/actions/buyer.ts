import { auth } from "@/auth";
import { getBuyerStatsService, getUserLibrary } from "@/services/buyer";
import { getRecentPurchasedAssets } from "@/services/buyer";

const PAGE_SIZE = 10;

export async function getMyLibrary(page: number, take: number = PAGE_SIZE) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      purchases: [],
      total: 0,
      totalPages: 0,
    };
  }

  return getUserLibrary(userId, page, take);
}

export const getMyRecentPurchasedAssets = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return [];

  return getRecentPurchasedAssets(userId);
};

export const getBuyerStats = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      assetsOwned: 0,
      totalSpent: 0,
    };
  }

  return getBuyerStatsService(userId);
};