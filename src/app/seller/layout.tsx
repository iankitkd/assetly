
import SellerSidebar from "@/components/seller/SellerSidebar";
import { AppBar, Box, Toolbar, Typography, } from "@mui/material";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", }}>
      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            Seller Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <SellerSidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
