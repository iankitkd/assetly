"use server";

import { getAssetById } from "@/services/asset";
import { auth } from "@/auth";
import { createFreeAssetPurchase } from "@/services/purchase";

export async function createPurchaseForFreeItem(assetId: string) {
  try {
    // authorise
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    // find asset
    const asset = await getAssetById(assetId);

    if (!asset) {
      return { success: false, message: "Asset not found" };
    }

    // create order and purchase
    await createFreeAssetPurchase(userId, {
      id: asset.id,
      price: asset.price,
    });

    return { success: true, message: "Purchase created" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}