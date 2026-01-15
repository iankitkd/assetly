export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createSignedUploadUrl } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "SELLER") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { bucket, fileName, contentType } = await req.json();

    const path = `${session.user.id}/${crypto.randomUUID()}-${fileName}`;

    const signedUploadUrl = await createSignedUploadUrl(bucket, path);

    return NextResponse.json({
      uploadUrl: signedUploadUrl,
      path,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error?.message : "Internal server error",},
      { status: 500 }
    );
  }
}
