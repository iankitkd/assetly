"use client";

import { AddBoxIcon, DashboardIcon, InventoryIcon, LibraryBooksIcon, ReceiptLongIcon, SettingsIcon, WalletIcon } from "@/components/icons";
import { RoleType } from "@/types";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const drawerWidth = 240;

const baseMenu = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Library", icon: <LibraryBooksIcon />,  path: "/library" },
  { label: "Orders", icon: <ReceiptLongIcon />, path: "/orders" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
]

const sellerMenu = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Library", icon: <LibraryBooksIcon />,  path: "/library" },
  { label: "My Assets", icon: <InventoryIcon />, path: "/my-assets" },
  { label: "Upload Asset", icon: <AddBoxIcon />, path: "/my-assets/new" },
  { label: "Earnings", icon: <WalletIcon />, path: "/earnings" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
]

export default function SideBar({role} : {role: RoleType}) {
  const pathname = usePathname();
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = role === "SELLER" ? sellerMenu : baseMenu;

  if(isMobile) {
    return null;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              selected={isActive}
              onClick={() => router.push(item.path)}
              sx={{
                borderRadius: 1,
                // mx: 1,
                mb: 0.5,
                ...(isActive && {
                  bgcolor: "primary.light",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                }),
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "primary.main" : "text.secondary" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "primary.main" : "text.primary",
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}
