"use client"

import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const howItWorks = [
  {
    step: "01",
    title: "Upload your assets",
    desc: "Add your digital products with detailed descriptions, previews, categories, and pricing. Assetly stores and delivers files securely.",
  },
  {
    step: "02",
    title: "Publish & reach buyers",
    desc: "Once published, your assets become discoverable to buyers browsing the marketplace. No marketing setup required.",
  },
  {
    step: "03",
    title: "Sell and earn",
    desc: "Buyers get instant access after purchase. You track orders, earnings, and performance from a single dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Stack spacing={2} textAlign="center" mb={8}>
        <Typography variant="h4" fontWeight={700}>
          How Assetly works
        </Typography>
        <Typography color="text.secondary">
          A clear, creator-friendly workflow designed to get you selling quickly
          without technical friction.
        </Typography>
      </Stack>

      <Grid container spacing={6}>
        {howItWorks.map((item) => (
          <Grid
            size={{ xs: 12, md: 4 }}
            key={item.step}
            bgcolor="background.paper"
          >
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="h3" fontWeight={700} color="primary">
                  {item.step}
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
