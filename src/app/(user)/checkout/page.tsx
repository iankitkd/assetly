import { getCartItems } from "@/actions/cart";
import Checkout from "@/components/commerce/Checkout";
import { redirect } from "next/navigation";

export default async function page() {
  const cartItems = await getCartItems();

  if (!cartItems.length) {
    redirect("/cart");
  }

  const total = cartItems.reduce((sum, i) => sum + i.asset.price, 0);

  return <Checkout total={total} />;
}
