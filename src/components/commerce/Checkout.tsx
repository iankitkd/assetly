"use client";

import {
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { createCheckoutSession, createCheckoutSessionForCart } from "@/actions/stripeSession";
import { useState } from "react";

export default function Checkout({ total, assetId }: { total: number, assetId?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const pay = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // stripe checkout for given assetId
      if(assetId) {
        const checkoutUrl = await createCheckoutSession([assetId]);
        if (!checkoutUrl) {
          throw new Error("Stripe session creation failed");
        }
        window.location.href = checkoutUrl;
        return;
      }

      // stripe Checkout for cart
      const checkoutUrl = await createCheckoutSessionForCart();
      if (!checkoutUrl) {
        throw new Error("Stripe session creation failed");
      }
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 3,
        maxWidth: 420,
        mx: "auto",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={700}>
          Checkout
        </Typography>

        <Divider />

        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">
            Total amount
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            ₹{total.toLocaleString()}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          size="large"
          loading={isLoading}
          onClick={pay}
          sx={{ px: 4 }}
        >
          Pay securely
        </Button>

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
        >
          Secure payment powered by Stripe
        </Typography>
      </Stack>
    </Card>
  );
}
