"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { AutoAwesomeOutlinedIcon, FlashOnOutlinedIcon, PublicOutlinedIcon, SecurityOutlinedIcon } from "@/components/icons";

const heading = "Built for creators and buyers";
const subHeading = "Everything you need to share, discover, and use digital assets in one simple, transparent platform.";

const features = [
  {
    title: "Simple asset experience",
    desc: "A clean, intuitive flow for uploading, browsing, and managing digital assets.",
    icon: AutoAwesomeOutlinedIcon,
  },
  {
    title: "Instant, reliable access",
    desc: "Seamless checkout and immediate access to purchased assets with no friction.",
    icon: FlashOnOutlinedIcon,
  },
  {
    title: "Secure ownership & usage",
    desc: "Clear licensing, protected files, and secure delivery built into every transaction.",
    icon: SecurityOutlinedIcon,
  },
  {
    title: "Quality marketplace",
    desc: "Discover and share high-quality digital assets in a trusted global marketplace.",
    icon: PublicOutlinedIcon,
  },
];

export default function Features() {
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

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid size={{ xs: 12, md: 6 }} key={feature.title}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    backgroundColor: "primary.light",
                  }}
                >
                  <feature.icon
                    sx={{
                      fontSize: 26,
                      color: "primary.main",
                    }}
                  />
                </Box>

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
