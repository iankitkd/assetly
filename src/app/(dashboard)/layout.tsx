
import { getCartCount } from "@/actions/cart";
import { auth } from "@/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/layout/Header";
import { RoleType } from "@/types";
import { Box, Toolbar, } from "@mui/material";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isLoggedIn = !!session;
  const role = session?.user?.role;

  const serverCartCount = await getCartCount();

  return (
    <Box sx={{ display: "flex", }}>
      {/* Top AppBar */}
      <Header
        isLoggedIn={isLoggedIn}
        role={role}
        serverCartCount={serverCartCount}
      />

      {/* Sidebar */}
      <Sidebar role={role as RoleType} />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
