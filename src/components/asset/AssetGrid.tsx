"use client";

import AssetCard from "@/components/asset/AssetCard";
import { Grid, Typography } from "@mui/material";

import { Asset } from "@/types";

export default function AssetGrid({ assets }: {assets: Asset[]}) {
  if (!assets.length) {
    return <Typography>No assets found.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {assets.map((asset) => (
        <Grid size={{xs:12, sm:6, md:4}} key={asset.id}>
          <AssetCard asset={asset} />
        </Grid>
      ))}
    </Grid>
  );
}
