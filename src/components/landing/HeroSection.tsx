"use client"

import { APP_NAME } from "@/data";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

const subHeading = `${APP_NAME} brings creators and buyers together in a secure, easy-to-use place for high-quality digital assets.`
// const subHeading2 = `${APP_NAME} is a trusted place to buy and sell high-quality digital assets designed for clarity, speed, and reliability.`

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
          sx={{textAlign: { xs: "inherit", md: "center" } }}
        >
          A simple
          <Typography component="span" variant="h3" fontWeight={700} letterSpacing={-1} color="primary"> 
            {" marketplace "}
          </Typography> 
          for
          <br />
          digital assets
        </Typography>

        <Typography
          component="h2"
          variant="h6"
          color="text.secondary"
          sx={{ lineHeight: 1.7, textAlign: { xs: "inherit", md: "center" } }}
        >
          {subHeading}
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
