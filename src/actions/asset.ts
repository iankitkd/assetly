import { prisma } from "@/lib/prisma";
import { SortTypes } from "@/data";
import { auth } from "@/auth";

const PAGE_SIZE = 9;

export interface SearchProps {
  q?: string;
  sort?: SortTypes;
  category?: string | null;
  subCategory?: string | null;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  take?: number;
}

export const getLatestAssets = async ({
  q,
  sort = "newest",
  category,
  subCategory,
  priceMin,
  priceMax,
  page,
  take = PAGE_SIZE
}: SearchProps) => {
  // WHERE clause
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

  // ORDER BY
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

  // SKIP
  const skip = page ? (page - 1) * PAGE_SIZE : 0;

  // QUERY
  const [assets, total] = await prisma.$transaction([
    prisma.asset.findMany({
      where,
      orderBy,
      skip,
      take,
    }),

    prisma.asset.count({
      where,
    }),
  ]);

  return {
    assets,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
  };
};


export const getAssetDetails = async (assetId: string) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

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


export const getAssetsByIds = async (assetIds: string[]) => {
  try {
    const assets = await prisma.asset.findMany({
      where: { id: { in: assetIds } },
    });
    return assets;
  } catch (error) {
    return [];
  }
}