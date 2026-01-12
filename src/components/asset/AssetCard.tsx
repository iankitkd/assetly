"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import NextLink from "next/link";
import { Asset } from "@/types";
import { ASSET_CATEGORIES } from "@/data/asset-categories";

export default function AssetCard({ asset }: { asset: Asset }) {
  const { title, category, price, previewUrl} = asset;

  return (
    <Card
      sx={{
        height: "100%",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 2,
        },
      }}
    >
      <MuiLink
        component={NextLink}
        href={`/assets/${asset.id}`}
        underline="none"
        color="text.primary"
        sx={{ display: "block" }}
      >
        <CardMedia
          component="img"
          height="160"
          image={previewUrl}
          alt={title}
          loading="lazy"
        />

        <CardContent>
          <Stack spacing={1}>
            <Typography fontWeight={600} noWrap>
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary" noWrap>
              {ASSET_CATEGORIES[category].label}
            </Typography>

            <Typography fontWeight={700}>
              ₹{price}
            </Typography>
          </Stack>
        </CardContent>
      </MuiLink>
    </Card>
  );
}
