export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Box } from "@mui/material";
import CategoryBar from "@/components/discover/CategoryBar";
import DiscoverFilters from "@/components/discover/DiscoverFilters";
import AssetGrid from "@/components/asset/AssetGrid";
import { getLatestAssets } from "@/actions/asset";
import { PRICE_MAX, PRICE_MIN, SortTypes } from "@/data";

type SearchParams = Promise<{ [key: string]: string }>

export default async function DiscoverPage(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;

  const q = searchParams.q;
  const sort = searchParams.sort ?? "newest";
  const category = searchParams.category;
  const subCategory = searchParams.subCategory;
  const priceMin = Number(searchParams.priceMin ?? PRICE_MIN);
  const priceMax = Number(searchParams.priceMax ?? PRICE_MAX);

  const assets = await getLatestAssets({q, sort: sort as SortTypes, category, subCategory, priceMin, priceMax});

  return (
    <Box sx={{px: 2}}>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryBar />
        <DiscoverFilters />
      </Suspense>
      <AssetGrid assets={assets} />
    </Box>
  );
}
