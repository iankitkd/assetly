"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ShoppingBagIcon, ShoppingCartIcon, DownloadIcon } from "@/components/icons";
import { ASSET_CATEGORIES } from "@/data/asset-categories";

type Props = {
  asset: any;
  isOwner: boolean;
  hasBought: boolean;
  isLoggedIn: boolean;
};

export default function AssetDetails({
  asset,
  isOwner,
  hasBought,
  isLoggedIn,
}: Props) {
  const canDownload = isOwner || hasBought;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 5, px: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Preview */}
        <Paper
          elevation={2}
          sx={{ flex: 1, borderRadius: 3, overflow: "hidden" }}
        >
          <Image
            src={asset.previewUrl}
            alt={asset.title}
            width={800}
            height={500}
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>

        {/* Purchase Panel */}
        <Paper
          elevation={3}
          sx={{
            width: { xs: "100%", md: 420 },
            borderRadius: 3,
            p: 3,
            position: "sticky",
            top: 96,
            height: "fit-content",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {asset.title}
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            by {asset.seller.name}
          </Typography>

          <Stack direction="row"  spacing={1} mt={2}>
            <Chip label={ASSET_CATEGORIES[asset.category].label} />
            <Chip label={ASSET_CATEGORIES[asset.category].subCategories[asset.subCategory].label} />
          </Stack>

          <Typography
            variant="h4"
            fontWeight={800}
            color="primary"
            mt={3}
          >
            ₹{asset.price}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {!canDownload && (
            <Stack spacing={1.5}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                href={!isLoggedIn ? "/login" : undefined}
              >
                Add to Cart
              </Button>

              <Button
                size="large"
                fullWidth
                variant="outlined"
                startIcon={<ShoppingBagIcon />}
                href={!isLoggedIn ? "/login" : undefined}
              >
                Buy Now
              </Button>
            </Stack>
          )}

          {canDownload && (
            <Button
              size="large"
              fullWidth
              variant="contained"
              startIcon={<DownloadIcon />}
              href={asset.fileUrl}
              target="_blank"
            >
              Download Asset
            </Button>
          )}
        </Paper>
      </Stack>

      {/* Description */}
      <Box mt={6}>
        <Typography variant="h6" fontWeight={700} mb={1}>
          Description
        </Typography>
        <Typography color="text.secondary" lineHeight={1.7} sx={{ whiteSpace: "pre-line" }}>
          {asset.description}
        </Typography>
      </Box>
    </Box>
  );
}
