import { getAssetDetails } from "@/actions/asset";
import { getCartItems } from "@/actions/cart";
import Checkout from "@/components/commerce/Checkout";
import { notFound, redirect } from "next/navigation";

type SearchParams = Promise<{[key: string] : string}>;

export default async function page(params : {searchParams: SearchParams}) {
  const searchParams = await params.searchParams;
  const id = searchParams.id;

  if(id) {
    const {asset, hasBought, isOwner} = await getAssetDetails(id);

    if(!asset) {
      return notFound();
    }

    if(isOwner || hasBought) {
      redirect(`/assets/${id}`);
    }

    return <Checkout total={asset?.price} assetId={asset.id} />;
  }
  
  const cartItems = await getCartItems();
  if (!cartItems.length) {
    redirect("/cart");
  }
  const total = cartItems.reduce((sum, i) => sum + i.asset.price, 0);

  return <Checkout total={total} />;
}
