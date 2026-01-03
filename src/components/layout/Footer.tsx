"use client";

import { APP_NAME } from "@/data";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} columns={12}>
          {/* Brand */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" gutterBottom>
              {APP_NAME}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A marketplace for high-quality digital assets created by
              professionals.
            </Typography>
          </Grid>

          {/* Marketplace */}
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Marketplace
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <MuiLink component={Link} href="/" underline="hover">
                Browse Assets
              </MuiLink>
              <MuiLink component={Link} href="/sell" underline="hover">
                Sell Assets
              </MuiLink>
              <MuiLink component={Link} href="/categories" underline="hover">
                Categories
              </MuiLink>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid size={{ xs: 6, sm: 4 }}>
            <Typography variant="subtitle1" gutterBottom>
              Legal
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <MuiLink component={Link} href="/terms" underline="hover">
                Terms of Service
              </MuiLink>
              <MuiLink component={Link} href="/privacy" underline="hover">
                Privacy Policy
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
