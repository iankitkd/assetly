"use client"

import { APP_NAME } from "@/data";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function HeroSection() {
  return (
    <Box
      sx={{
        py: { xs: 12, md: 18 },
      }}
    >
      <Stack
        spacing={4}
        maxWidth="720px"
        alignItems="center"
        justifySelf="center"
      >
        <Typography
          component="h1"
          variant="h3"
          fontWeight={700}
          letterSpacing={-1}
        >
          A simple marketplace for
          <br />
          high-quality digital assets
        </Typography>

        <Typography
          component="h2"
          variant="h6"
          color="text.secondary"
          sx={{ lineHeight: 1.7, textAlign: { xs: "inherit", md: "center" } }}
        >
          {APP_NAME} helps creators sell digital products effortlessly — from
          design assets to code, templates, and beyond. Built for simplicity,
          speed, and trust.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            size="large"
            variant="outlined"
            component={Link}
            href="/signup"
          >
            Start selling
          </Button>
          <Button
            size="large"
            variant="contained"
            component={Link}
            href="/discover"
          >
            Explore marketplace
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
