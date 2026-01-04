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
