import { getAssetsByIds } from "@/services/asset";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();

    if (!ids?.length) return NextResponse.json([]);

    const assets = await getAssetsByIds(ids);
    return NextResponse.json(assets);
  } catch (error) {
    return NextResponse.json([]);
  }
}
