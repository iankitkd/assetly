"use client"

import { APP_NAME } from "@/data";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Link from "next/link";

const heading = "Get started with digital assets";
const subHeading = `Join ${APP_NAME} to publish, discover, and access digital assets through a clear, trusted platform.`;

export default function CTA() {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: "center" }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {heading}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
              {subHeading}
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
