import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createSignedUrl } from "@/lib/storage";
import { ASSET_BUCKET } from "@/data";
import { getPurchase } from "@/actions/purchase";

type Params = Promise<{ assetId: string }>

export async function GET( req: NextRequest, segmentData: { params: Params } ) {
  const params = await segmentData.params;
  const assetId = params.assetId;

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Check purchase
  const purchase = await getPurchase({assetId, userId});

  if (!purchase) {
    return NextResponse.json(
      { error: "Asset not purchased" },
      { status: 403 }
    );
  }

  // 2. Generate signed URL
  const { data, error } = await createSignedUrl(ASSET_BUCKET, purchase.asset.fileUrl)

  if (error) {
    return NextResponse.json(
      { error: "Failed to generate download link" },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: data.signedUrl });
}
