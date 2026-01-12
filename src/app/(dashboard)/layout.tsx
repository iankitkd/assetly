
import { getCartCount } from "@/actions/cart";
import { auth } from "@/auth";
import BottomBar from "@/components/dashboard/BottomBar";
import SideBar from "@/components/dashboard/SideBar";
import Header from "@/components/layout/Header";
import { RoleType } from "@/types";
import { Box, Toolbar, } from "@mui/material";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isLoggedIn = !!session;
  const role = session?.user?.role;

  const serverCartCount = await getCartCount();

  return (
    <Box >
      {/* Top AppBar */}
      <Header
        isLoggedIn={isLoggedIn}
        role={role}
        serverCartCount={serverCartCount}
      />

      {/* Sidebar */}
      <SideBar role={role as RoleType} />

      {/* Main Content */}
      <Box component="main" sx={{ ml: {xs: 0, md: "240px"}, p: 2, pb: { xs: 9, md: 0 } }}>
        <Toolbar />
        {children}
      </Box>

      {/* Bottombar */}
      <BottomBar role={role as RoleType} />
    </Box>
  );
}
