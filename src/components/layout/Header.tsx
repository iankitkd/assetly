"use client";

import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
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

function SearchField({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // flexGrow: 1,
        width: fullWidth ? "100%" : 420,
        mx: "auto",
        backgroundColor: "rgba(79,70,229,0.08)", // indigo tint
        border: "1px solid",
        borderColor: "rgba(79,70,229,0.25)",
        borderRadius: 2,
        px: 1.5,
        py: 0.75,
        transition: "background-color 0.2s, border-color 0.2s",
        "&:hover": {
          backgroundColor: "rgba(79,70,229,0.12)",
          borderColor: "rgba(79,70,229,0.35)",
        },
        "&:focus-within": {
          backgroundColor: "rgba(79,70,229,0.14)",
          borderColor: "primary.main",
        },
      }}
    >
      <SearchIcon sx={{ mr: 1, color: "primary.main" }} />
      <InputBase
        placeholder="Search assets..."
        sx={{
          width: "100%",
          fontSize: 14,
        }}
      />
    </Box>
  );
}
