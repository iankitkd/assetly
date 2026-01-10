import { verifyStripeSession } from "@/actions/stripeSession";
import CheckoutSuccess from "@/components/commerce/CheckoutSuccess";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string }>

export default async function page(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;
  const { session_id, free } = searchParams;

  // Free-only checkout
  if (free === "true") {
    return <CheckoutSuccess />;
  }

  // No session_id - block access
  if (!session_id) {
    console.log("id")
    redirect("/cart");
  }

  try {
    await verifyStripeSession(session_id);
  } catch (error) {
    console.log(error, "ver")
    redirect("/cart");
  }

  return <CheckoutSuccess />;
}
