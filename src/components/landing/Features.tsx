"use client"

import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const features = [
  {
    title: "Simple asset publishing",
    desc: "Upload your digital files, add descriptions, previews, categories, and pricing in minutes. Assetly handles file delivery securely and reliably.",
  },
  {
    title: "Transparent earnings",
    desc: "Track sales, revenue, and performance in real time. Clear breakdowns help you understand what’s selling and why.",
  },
  {
    title: "Secure purchases & licensing",
    desc: "Every purchase is protected with secure checkout and asset access. Buyers receive instant downloads with clear usage rights.",
  },
  {
    title: "Designed to scale with you",
    desc: "Whether you sell one asset or hundreds, Assetly grows with your business — no setup fees, no subscriptions.",
  },
];

export default function Features() {
  return (
    <Container maxWidth="lg" sx={{ py: 12 }} >
      <Stack spacing={2} textAlign="center" mb={8}>
        <Typography variant="h4" fontWeight={700}>
          Built for creators and buyers
        </Typography>
        <Typography color="text.secondary">
          Everything you need to publish, sell, and manage digital assets
          without complexity or hidden costs.
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid size={{ xs: 12, md: 6 }} key={feature.title}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
