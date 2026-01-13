"use client"

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function CTA() {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Start building your digital income
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              Join Assetly today and turn your digital creations into a
              sustainable source of income without complexity.
            </Typography>
            <Button
              size="large"
              variant="contained"
              component={Link}
              href="/signup"
            >
              Create your account
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
