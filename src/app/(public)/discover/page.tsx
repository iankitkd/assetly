export const dynamic = "force-dynamic";
// export const revalidate = 60; // seconds

import { Suspense } from "react";
import { Box } from "@mui/material";
import CategoryBar from "@/components/discover/CategoryBar";
import DiscoverFilters from "@/components/discover/DiscoverFilters";
import AssetGrid from "@/components/asset/AssetGrid";
import { searchAssets } from "@/services/asset";
import { PRICE_MAX, PRICE_MIN, SortTypes } from "@/data";
import { redirect } from "next/navigation";
import AssetsPagination from "@/components/shared/AssetsPagination";

type SearchParams = Promise<{ [key: string]: string }>

export default async function DiscoverPage(props: {searchParams: SearchParams}) {
  const searchParams = await props.searchParams;

  const q = searchParams.q;
  const sort = searchParams.sort ?? "newest";
  const category = searchParams.category;
  const subCategory = searchParams.subCategory;
  const priceMin = Number(searchParams.priceMin ?? PRICE_MIN);
  const priceMax = Number(searchParams.priceMax ?? PRICE_MAX);
  const page = Math.max(1, Number(searchParams.page) || 1);
  
  const {assets, totalPages} = await searchAssets({q, sort: sort as SortTypes, category, subCategory, priceMin, priceMax, page});
  
  if(totalPages > 0 && page > totalPages) {
    const params = new URLSearchParams(searchParams);
    params.set("page", totalPages.toString());
    redirect(`/discover?${params.toString()}`);
  }

  return (
    <Box sx={{px: 2}}>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryBar />
        <DiscoverFilters />
      </Suspense>
      <AssetGrid assets={assets} />
      {totalPages > 1 && (
        <AssetsPagination page={page} totalPages={totalPages} mainPath="/discover" />
      )}
    </Box>
  );
}
