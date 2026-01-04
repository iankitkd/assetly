import { prisma } from "@/lib/prisma";
import { SortTypes } from "@/data";

export interface SearchProps {
  q?: string;
  sort?: SortTypes;
  category?: string | null;
  subCategory?: string | null;
  priceMin?: number;
  priceMax?: number;
}

export const getLatestAssets = async ({
  q,
  sort = "newest",
  category,
  subCategory,
  priceMin,
  priceMax,
}: SearchProps) => {
  /* WHERE clause */
  const where: any = {};

  if (q) {
    where.OR = [
      {
        title: { contains: q, mode: "insensitive", },
      },
      {
        description: { contains: q, mode: "insensitive", },
      },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (subCategory) {
    where.subCategory = subCategory;
  }

  if (priceMin !== undefined || priceMax !== undefined) {
    where.price = {
      gte: priceMin,
      lte: priceMax,
    };
  }

  /* ORDER BY */
  let orderBy: Object;

  switch (sort) {
    case "popular":
      orderBy = { salesCount: "desc" };
      break;

    case "price-asc":
      orderBy = { price: "asc" };
      break;

    case "price-desc":
      orderBy = { price: "desc" };
      break;

    case "newest":
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  /* QUERY */
  const assets = await prisma.asset.findMany({
    where,
    orderBy,
    take: 12,
  });

  return assets;
};


export const getAssetDetails = async ({assetId, userId} : {assetId: string, userId?: string}) => {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: assetId },
      include: {
        seller: {
          select: { id: true, name: true },
        },
      },
    });

    if (!asset) {
      return ({asset: null, hasBought: false, isOwner: false});
    }

    let hasBought = false;
    let isOwner = false;
    let isInCart = false;

    if (userId) {
      isOwner = userId === asset.sellerId;

      const purchase = await prisma.purchase.findUnique({
        where: {
          userId_assetId: {
            userId: userId,
            assetId: assetId,
          },
        },
      });

      const cart = await prisma.cartItem.findUnique({
        where: {
          userId_assetId: {
            userId: userId,
            assetId: assetId,
          },
        },
      });

      hasBought = !!purchase;
      isInCart = !!cart;
    }

    return {asset, hasBought, isOwner, isInCart};
  } catch (error) {
    return ({asset: null, hasBought: false, isOwner: false});
  }
}