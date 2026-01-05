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
import { addToCart } from "@/actions/cart";
import { useRouter } from "next/navigation";
import AlertSnackbar from "@/components/shared/AlertSnackbar";
import { useState } from "react";
import { addToGuestCart } from "@/utils/cartStorage";
import { useCartStore } from "@/store/cartStore";

type Props = {
  asset: any;
  isOwner: boolean;
  hasBought: boolean;
  isInCart: boolean;
  isLoggedIn: boolean;
};

export default function AssetDetails({
  asset,
  isOwner,
  hasBought,
  isInCart,
  isLoggedIn,
}: Props) {
  const canDownload = isOwner || hasBought;

  const router = useRouter();
  const [status, setStatus] = useState<{success: boolean, message: string}>({success: isInCart, message: ""});
  const [open, setOpen] = useState(false);

  const addToCartHandler = async () => {
    if(status?.success) {
      router.push("/cart");
      return;
    }

    if(isLoggedIn) {
      const res = await addToCart(asset.id);
      setStatus({success: res.success, message: res.message});
    } else{
      addToGuestCart(asset.id);
      setStatus({success: true, message: "Added to Cart"});
    }
    useCartStore.getState().increment();
    setOpen(true);
    router.refresh();
  }

  return (
    <Box maxWidth="xl" sx={{ mx: "auto", py: 5, px: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* Preview */}
        <Paper sx={{ flex: 1, borderRadius: 3, overflow: "hidden" }}>
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
                onClick={addToCartHandler}
              >
                {status?.success ? "Go to Cart" : "Add to Cart"}
              </Button>

              <Button
                size="large"
                fullWidth
                variant="outlined"
                startIcon={<ShoppingBagIcon />}
                href={`/checkout/?id=${asset.id}`}
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

      <AlertSnackbar
        open={open}
        setOpen={setOpen}
        success={status?.success}
        message={status?.message}
      />
    </Box>
  );
}
