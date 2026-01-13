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
import { mergeGuestCart, removeFromCart } from "@/actions/cart";
import { useEffect, useState } from "react";
import { clearGuestCart, getGuestCart, removeFromGuestCart } from "@/utils/cartStorage";
import { Asset } from "@/types";
import { useCartStore } from "@/store/cartStore";
import Loader from "@/components/shared/Loader";

interface CartItem {
  id: string;
  asset: {
    id: string;
    title: string;
    price: number;
    previewUrl: string;
  };
}

export default function Cart({ items, isLoggedIn }: { items: CartItem[], isLoggedIn: boolean }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [guestItems, setGuestItems] = useState<CartItem[]>([]);

  const getCart = async () => {
    setIsLoading(true);
    const ids = getGuestCart();

    if (!ids.length) {
      setGuestItems([]);
      setIsLoading(false);
      return;
    }

    const res = await fetch("/api/cart/guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    const assets = await res.json();

    const items = assets.map((el: Asset) => ({id: el.id, asset: el}));
    setGuestItems(items);
    setIsLoading(false);
  };

  const mergeCart = async () => {
    setIsLoading(true);
    await mergeGuestCart(getGuestCart());
    clearGuestCart();
    router.refresh();
    setIsLoading(false);
  }

  useEffect(() => {
    if(!isLoggedIn) getCart();

    if(isLoggedIn) mergeCart();
  }, [isLoggedIn]);


  const data = !isLoggedIn ? guestItems : items ?? [];
  const total = data.reduce((sum, i) => sum + i.asset.price, 0);

  if(isLoading) {
    return <Loader />
  }

  if (data.length === 0) {
    return (
      <Typography color="text.secondary">
        Your cart is empty.
      </Typography>
    )
  }

  const removeFromCartHandler = async (id: string) => {
    if(isLoggedIn) {
      await removeFromCart(id);
    } else {
      removeFromGuestCart(id);
      setGuestItems((prev) => prev.filter((cart) => cart.id !== id));
    }
    useCartStore.getState().decrement();
    router.refresh();
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
      {/* Cart Items */}
      <Stack spacing={2} flex={1}>
        {data.map((item) => (
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
            href={isLoggedIn ? "/checkout" : "/login?callbackUrl=/cart"}
          >
            {isLoggedIn ? "Proceed to Checkout" : "Login to buy"}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
