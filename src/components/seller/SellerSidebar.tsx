"use client";

import { AddBoxIcon, DashboardIcon, InventoryIcon } from "@/components/icons";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const drawerWidth = 240;

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/seller/dashboard" },
  { label: "Assets", icon: <InventoryIcon />, path: "/seller/assets" },
  { label: "Upload Asset", icon: <AddBoxIcon />, path: "/seller/assets/new" },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
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
