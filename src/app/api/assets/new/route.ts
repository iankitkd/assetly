export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { assetServerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "SELLER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const parsed = assetServerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const {
      title,
      description,
      price,
      mainCategory,
      subCategory,
      previewUrl,
      assetPath,
    } = parsed.data;

    await prisma.asset.create({
      data: {
        title,
        description,
        price: Number(price),
        category: mainCategory,
        subCategory,
        previewUrl,
        fileUrl: assetPath,
        sellerId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
