"use client";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Link as MuiLink,
  Chip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Image from "next/image";
import NextLink from "next/link";
import { ASSET_CATEGORIES } from "@/data/asset-categories";

type Props = {
  asset: {
    id: string;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    createdAt: Date;
  };
  purchasedAt: Date;
};

export default function LibraryAssetCard({ asset, purchasedAt }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-1px)",
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
        {/* Image */}
        <Box sx={{ position: "relative", height: 190 }}>
          <Image
            src={asset.thumbnail}
            alt={asset.title}
            fill
            style={{ objectFit: "cover" }}
          />

          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)",
            }}
          />

          {/* Top badges */}
          <Chip
            label={ASSET_CATEGORIES[asset.category].label}
            size="small"
            sx={{
              position: "absolute", 
              top: 12, 
              left: 12,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "#fff",
              fontWeight: 500,
            }}
          />

        {/* Price badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "background.paper",
            px: 1.4,
            py: 0.6,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {asset.price === 0 ? "Free" : `₹${asset.price}`}
        </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {asset.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Purchased on {purchasedAt.toLocaleDateString()}
          </Typography>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => {}}
          >
            Download
          </Button>
        </CardActions>
      </MuiLink>
    </Card>
  );
}
