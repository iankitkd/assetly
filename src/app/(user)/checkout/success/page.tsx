import CheckoutSuccess from "@/components/commerce/CheckoutSuccess";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string }>

export default async function page(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;

  if (!sessionId) redirect("/");

  const order = await prisma.order.findUnique({
    where: { stripeSession: sessionId },
  });

  // No order = no success
  if (!order || order.status !== "PAID") {
    redirect("/");
  }

  return <CheckoutSuccess />;
}
