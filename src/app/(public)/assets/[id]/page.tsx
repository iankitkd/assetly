export const revalidate = 120; // seconds

import { auth } from "@/auth";
import { notFound } from "next/navigation";
import AssetDetails from "@/components/asset/AssetDetails";
import { getAssetDetails } from "@/actions/asset";

export default async function AssetPage(props: {params: Promise<{ id: string }>}) {
  const params = await props.params;
  const session = await auth();

  const assetId = params.id;
  const { asset, isOwner, hasBought, isInCart } = await getAssetDetails(assetId);

  if (!asset) return notFound();

  return (
    <AssetDetails
      asset={asset}
      isOwner={isOwner}
      hasBought={hasBought}
      isInCart={isInCart}
      isLoggedIn={!!session}
    />
  );
}
