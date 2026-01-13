"use server";

import { auth } from "@/auth";
import { ASSET_BUCKET, ASSET_PREVIEW_BUCKET } from "@/data";
import { prisma } from "@/lib/prisma";
import { getPublicUrl, uploadFile } from "@/lib/storage";
import { assetSchema } from "@/lib/validators";

export async function uploadAsset(formData: FormData) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "SELLER") {
      throw new Error("Unauthorized");
    }

    // Validate
    const validatedFields = assetSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      mainCategory: formData.get("mainCategory"),
      subCategory: formData.get("subCategory"),
      preview: formData.getAll("preview"),
      assetFile: formData.getAll("assetFile"),
    });

    if(!validatedFields.success) {
      return { success: false, message: "Invalid fields!" };
    }

    const preview = formData.get("preview") as File;
    const assetFile = formData.get("assetFile") as File;

    const previewPath = `${session.user.id}/${crypto.randomUUID()}-${preview.name}`;
    const assetPath = `${session.user.id}/${crypto.randomUUID()}-${assetFile.name}`;

    await uploadFile(ASSET_PREVIEW_BUCKET, previewPath, preview);
    await uploadFile(ASSET_BUCKET, assetPath, assetFile);

    const previewUrl = await getPublicUrl(ASSET_PREVIEW_BUCKET, previewPath);

    await prisma.asset.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        category: formData.get("mainCategory") as string,
        subCategory: formData.get("subCategory") as string,
        previewUrl,
        fileUrl: assetPath,
        sellerId: session.user.id,
      },
    });

    return {success: true, message: "Asset published successfully" };

  } catch (error) {
    return {success: false, message: "Something went wrong", error: error};
  }
}
