"use client";

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Fab,
} from "@mui/material";
import {
  AddBoxIcon,
  DashboardIcon,
  InventoryIcon,
  LibraryBooksIcon,
  SettingsIcon,
} from "@/components/icons";
import { RoleType } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const baseMenu = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Library", icon: <LibraryBooksIcon />, path: "/library" },
  // { label: "Orders", icon: <ReceiptLongIcon />, path: "/orders" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

const sellerMenu = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Library", icon: <LibraryBooksIcon />, path: "/library" },
  { label: "Assets", icon: <InventoryIcon />, path: "/my-assets" },
  // { label: "Earnings", icon: <WalletIcon />, path: "/earnings" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

export default function BottomBar({ role }: { role: RoleType }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = role === "SELLER" ? sellerMenu : baseMenu;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentIndex = menuItems.findIndex(
    (item) => pathname === item.path || pathname.startsWith(item.path + "/")
  );

  const [value, setValue] = useState(currentIndex);

  useEffect(() => {
    setValue(currentIndex);
  }, [currentIndex]);


  if(!isMobile) {
    return null;
  }

  return (
    <Box>
      {role === "SELLER" && pathname !== "/my-assets/new" && (
        <Fab
          color="primary"
          onClick={() => router.push("/my-assets/new")}
          sx={{
            position: "fixed",
            bottom: 70,
            right: 0,
            transform: "translateX(-50%)",
            zIndex: 1400,
            boxShadow: 6,
          }}
        >
          <AddBoxIcon />
        </Fab>
      )}

      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <BottomNavigation
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            router.push(menuItems[newValue].path);
          }}
          showLabels
        >
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={item.icon}
              sx={{
                "&.Mui-selected": {
                  color: "primary.main",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
