import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import AssetDetails from "@/components/asset/AssetDetails";

export default async function AssetPage(props: {params: Promise<{ id: string }>}) {
  const params = await props.params;
  const session = await auth();

  const asset = await prisma.asset.findUnique({
    where: { id: params.id },
    include: {
      seller: {
        select: { id: true, name: true },
      },
    },
  });

  if (!asset) return notFound();

  let hasBought = false;
  let isOwner = false;

  if (session?.user?.id) {
    isOwner = session.user.id === asset.sellerId;

    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_assetId: {
          userId: session.user.id,
          assetId: asset.id,
        },
      },
    });

    hasBought = !!purchase;
  }

  return (
    <AssetDetails
      asset={asset}
      isOwner={isOwner}
      hasBought={hasBought}
      isLoggedIn={!!session}
    />
  );
}
