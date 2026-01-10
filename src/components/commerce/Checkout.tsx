"use client";

import {
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { createCheckoutSession } from "@/actions/stripeSession";
import { useState } from "react";
import { createPurchaseForFreeItems } from "@/actions/purchase";
import { useRouter } from "next/navigation";

export default function Checkout({ total }: { total: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const pay = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // 1️. Create purchases for FREE items
      await createPurchaseForFreeItems();

      // 2️. If no paid items - go directly to success
      if (total === 0) {
        router.push("/checkout/success?free=true");
        return;
      }

      // 3️. Paid items → Stripe Checkout
      const checkoutUrl = await createCheckoutSession();
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
