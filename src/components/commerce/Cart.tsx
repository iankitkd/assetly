"use client";

import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { removeFromCart } from "@/actions/cart";

interface CartItem {
  id: string;
  asset: {
    id: string;
    title: string;
    price: number;
    previewUrl: string;
  };
}

export default function Cart({ items }: { items: CartItem[] }) {
  const router = useRouter();

  const total = items.reduce((sum, i) => sum + i.asset.price, 0);

  if (items.length === 0) {
    return <Typography color="text.secondary">Your cart is empty.</Typography>;
  }

  const removeFromCartHandler = async (id: string) => {
    await removeFromCart(id);
    router.refresh();
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
      {/* Cart Items */}
      <Stack spacing={2} flex={1}>
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: "flex",
              p: 2,
              gap: 2,
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              image={item.asset.previewUrl}
              sx={{ width: 96, height: 96, borderRadius: 2 }}
            />

            <Box flex={1}>
              <Typography fontWeight={600}>{item.asset.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                ₹{item.asset.price}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => removeFromCartHandler(item.asset.id)}
            >
              Remove
            </Button>
          </Card>
        ))}
      </Stack>

      {/* Summary */}
      <Box
        sx={{
          width: { xs: "100%", md: 420 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
          height: "fit-content",
        }}
      >
        <Typography fontWeight={700} mb={2}>
          Order Summary
        </Typography>

        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Total</Typography>
            <Typography fontWeight={600}>₹{total}</Typography>
          </Stack>

          <Divider />

          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            href="/checkout"
          >
            Proceed to Checkout
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
