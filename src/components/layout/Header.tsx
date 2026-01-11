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
import { useEffect, useState } from "react";

import { SearchIcon } from "@/components/icons";
import HeaderActions from "@/components/layout/HeaderActions";
import Logo from "@/components/shared/Logo";
import SearchField from "@/components/layout/SearchField";
import { getGuestCartCount } from "@/utils/cartStorage";
import { useCartStore } from "@/store/cartStore";

interface HeaderProps {
  isLoggedIn?: boolean;
  role?: "USER" | "SELLER";
  serverCartCount: number;
  containsSearchBar?: boolean;
}

export default function Header({
  isLoggedIn = false,
  role = "USER",
  serverCartCount,
  containsSearchBar = false,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
  if (!isLoggedIn) {
    useCartStore.getState().setCount(getGuestCartCount());
  } else {
    useCartStore.getState().setCount(serverCartCount);
  }
}, [isLoggedIn]);


  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: 1201,
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
          {(!isMobile && containsSearchBar) && <SearchField />}

          {/* Mobile Search Toggle */}
          {(isMobile && containsSearchBar) && (
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
            role={role}
            isLoggedIn={isLoggedIn}
            isMobile={isMobile}
          />
        </Container>
      </Toolbar>

      {/* Mobile Search Bar */}
      {(isMobile && containsSearchBar) && (
        <Collapse in={isSearchOpen}>
          <Box sx={{ px: 2, pb: 1.5, }}>
            <SearchField fullWidth />
          </Box>
        </Collapse>
      )}
    </AppBar>
  );
}