import { Box, Divider, Grid } from "@mui/material";
import CategoryBar from "@/components/discover/CategoryBar";
// import DiscoverFilters from "@/components/discover/DiscoverFilters";
import AssetGrid from "@/components/asset/AssetGrid";
import { getLatestAssets } from "@/actions/asset";

export default async function DiscoverPage() {
  const assets = await getLatestAssets();

  return (
    <Box>
      {/* Top category bar */}
      <CategoryBar />

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* Left filters */}
        <Grid size={{ xs: 12, md: 3 }}>
          {/* <DiscoverFilters /> */}
        </Grid>

        {/* Right assets */}
        <Grid size={{ xs: 12, md: 9 }}>
          <AssetGrid assets={assets} />
        </Grid>
      </Grid>
    </Box>
  );
}
