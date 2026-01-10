import {
  DashboardIcon,
  LoginIcon,
  SellIcon,
  ShoppingCartIcon,
} from "@/components/icons";
import { useCartStore } from "@/store/cartStore";
import { Badge, Box, Button, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";

interface HeaderActionsProps {
  isMobile: boolean;
  // cartCount: number;
  isLoggedIn: boolean;
  role: "USER" | "SELLER";
}

export default function HeaderActions({
  isMobile,
  // cartCount,
  isLoggedIn,
  role,
}: HeaderActionsProps) {
  const cartCount = useCartStore((s) => s.count);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {/* Cart */}
      <Tooltip title="Cart">
        <IconButton color="inherit" component={Link} href="/cart">
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {/* Login */}
      {!isLoggedIn &&
        (isMobile ? (
          <Tooltip title="Sign in">
            <IconButton color="inherit" component={Link} href="/login">
              <LoginIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            color="inherit"
            component={Link}
            href="/login"
            startIcon={<LoginIcon />}
          >
            Sign in
          </Button>
        ))}

      {/* Dashboard */}
      {isLoggedIn &&
        (isMobile ? (
          <Tooltip title="Dashboard">
            <IconButton
              color="inherit"
              component={Link}
              href={role === "USER" ? "/dashboard" : "/seller/dashboard"}
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href={role === "USER" ? "/dashboard" : "/seller/dashboard"}
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
        ))}

      {/* Sell */}
      {(!isLoggedIn || role === "SELLER") &&
        (isMobile ? (
          <Tooltip title="Sell">
            <IconButton
              color="inherit"
              component={Link}
              href="/seller/assets/new"
            >
              <SellIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/seller/assets/new"
            startIcon={<SellIcon />}
          >
            Sell
          </Button>
        ))}
    </Box>
  );
}