import { verifyStripeSession } from "@/actions/stripeSession";
import CheckoutSuccess from "@/components/commerce/CheckoutSuccess";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string }>

export default async function page(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;
  const { session_id } = searchParams;

  // No session_id - block access
  if (!session_id) {
    redirect("/cart");
  }

  try {
    await verifyStripeSession(session_id);
  } catch (error) {
    redirect("/cart");
  }

  return <CheckoutSuccess />;
}
