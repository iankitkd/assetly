"use client"

import {
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const heading = "How Assetly works";
const subHeading = "A clear, intuitive workflow designed to support seamless creation, discovery, and access."

const howItWorks = [
  {
    step: "01",
    title: "Add digital assets",
    desc: "Upload assets with clear descriptions, previews, and categories. Files are stored and delivered securely.",
  },
  {
    step: "02",
    title: "Discover and access",
    desc: "Assets become available in the marketplace, making it easy to explore and find what you need.",
  },
  {
    step: "03",
    title: "Complete transactions",
    desc: "Secure checkout with instant access to purchased assets and a clear overview of activity.",
  },
];

export default function HowItWorks() {
  return (
    <Container maxWidth="lg" sx={{ py: 12 }}>
      <Stack spacing={2} textAlign="center" mb={8}>
        <Typography variant="h4" fontWeight={700}>
          {heading}
        </Typography>
        <Typography color="text.secondary">
          {subHeading}
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
