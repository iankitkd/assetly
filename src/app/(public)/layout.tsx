
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Box, Container, Toolbar } from "@mui/material";
import { auth } from "@/auth";
import { getCartCount } from "@/actions/cart";

export default async function PublicLayout({ children }: Readonly<{children: React.ReactNode}>) {
  const session = await auth();
  const isLoggedIn = !!session;
  const role = session?.user?.role;

  const serverCartCount = await getCartCount();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header
        isLoggedIn={isLoggedIn}
        role={role}
        serverCartCount={serverCartCount}
        containsSearchBar={true}
      />

      <Container
        maxWidth="xl"
        component="main"
        sx={{ flexGrow: 1, p: 0, minHeight: "100vh" }}
      >
        <Toolbar />
        {children}
      </Container>

      <Footer />
    </Box>
  );
}
