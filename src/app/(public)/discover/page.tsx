export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { Box } from "@mui/material";
import CategoryBar from "@/components/discover/CategoryBar";
import DiscoverFilters from "@/components/discover/DiscoverFilters";
import AssetGrid from "@/components/asset/AssetGrid";
import { getLatestAssets } from "@/actions/asset";

export default async function DiscoverPage() {
  const assets = await getLatestAssets();

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
