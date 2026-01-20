import { auth } from "@/auth";
import { getAssetById } from "@/services/asset";
import { hasUserPurchasedAsset } from "@/services/purchase";
import { isAssetInUserCart } from "@/services/cart";

export const getAssetDetails = async (assetId: string) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const asset = await getAssetById(assetId);

    if (!asset) {
      return ({asset: null, hasBought: false, isOwner: false});
    }

    let hasBought = false;
    let isOwner = false;
    let isInCart = false;

    if (userId) {
      isOwner = userId === asset.sellerId;

      const [purchase, cart] = await Promise.all([
        hasUserPurchasedAsset({userId, assetId}),
        isAssetInUserCart({userId, assetId}),
      ]);

      hasBought = Boolean(purchase);
      isInCart = Boolean(cart);
    }

    return {asset, hasBought, isOwner, isInCart};
  } catch (error) {
    return ({asset: null, hasBought: false, isOwner: false});
  }
}