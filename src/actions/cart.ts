"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { addToCartService, getUserCartCount, getUserCartItems, mergeGuestCartService, removeFromCartService } from "@/services/cart";

export const addToCart = async (assetId: string) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  return addToCartService({userId, assetId});
};

export const removeFromCart = async (assetId: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return;

  await removeFromCartService({assetId, userId});
};

export const getCartItems = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return [];

  return getUserCartItems(userId);
};

export const getCartCount = async () : Promise<number> => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return 0;

  return getUserCartCount(userId);
}

export const mergeGuestCart = async (assetIds: string[]) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId || assetIds.length === 0) return;

  await mergeGuestCartService(userId, assetIds);
};
