"use client";

import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Tooltip,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import { SearchIcon } from "@/components/icons";
import HeaderActions from "@/components/layout/HeaderActions";
import Logo from "@/components/shared/Logo";
import SearchField from "@/components/layout/SearchField";

interface HeaderProps {
  isLoggedIn?: boolean;
  role?: "USER" | "SELLER";
}

export default function Header({
  isLoggedIn = false,
  role = "USER",
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartCount = 2;

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
      }}
    >
      <Toolbar>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            px: 0,
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop Search */}
          {!isMobile && <SearchField />}

          {/* Mobile Search Toggle */}
          {isMobile && (
            <Tooltip title="Search">
              <IconButton
                color="inherit"
                onClick={() => setIsSearchOpen((prev) => !prev)}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Actions */}
          <HeaderActions
            cartCount={cartCount}
            role={role}
            isLoggedIn={isLoggedIn}
            isMobile={isMobile}
          />
        </Container>
      </Toolbar>

      {/* Mobile Search Bar */}
      {isMobile && (
        <Collapse in={isSearchOpen}>
          <Box sx={{ px: 2, pb: 1.5, }}>
            <SearchField fullWidth />
          </Box>
        </Collapse>
      )}
    </AppBar>
  );
}