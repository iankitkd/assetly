"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  Container,
} from "@mui/material";

import { LayersOutlinedIcon, SearchIcon } from "@/components/icons";
import { APP_NAME } from "@/data";


export default function Header() {
  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar>
        <Container maxWidth="lg" sx={{display: "flex", px: 0, gap: 2, flexDirection: 'row'}}>
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <LayersOutlinedIcon sx={{ fontSize: 28 }} />

            <Typography
              sx={{
                fontWeight: 600,
                letterSpacing: "-0.3px",
                typography: {xs: 'h6', md: 'h5'}
              }}
            >
              {APP_NAME}
            </Typography>
          </Box>


          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              maxWidth: 420,
              mx: 'auto',
              backgroundColor: "rgba(255,255,255,0.15)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
              },
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
            }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            <InputBase
              placeholder="Search assets…"
              sx={{
                color: "inherit",
                width: "100%",
              }}
            />
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              href="/login"
            >
              Sign in
            </Button>

            <Button
              variant="contained"
              color="secondary"
              component={Link}
              href="/sell"
            >
              Sell
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
