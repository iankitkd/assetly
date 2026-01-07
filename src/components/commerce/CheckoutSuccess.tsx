"use client";

import { CheckCircleRoundedIcon } from "@/components/icons";
import { Button, Card, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <Card
      sx={{
        my: 4,
        p: 4,
        borderRadius: 3,
        maxWidth: 420,
        mx: "auto",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <CheckCircleRoundedIcon
          sx={{
            fontSize: 72,
            color: "success.main",
          }}
        />

        <Typography variant="h5" fontWeight={700}>
          Payment successful
        </Typography>

        <Typography color="text.secondary">
          Your purchase is complete. The assets are now available in your
          library and ready to download.
        </Typography>

        <Button
          component={Link}
          href="/library"
          variant="contained"
          size="large"
          sx={{ px: 4 }}
        >
          Go to Library
        </Button>

        <Typography variant="caption" color="text.secondary">
          You can access your purchases anytime from your account.
        </Typography>
      </Stack>
    </Card>
  );
}
