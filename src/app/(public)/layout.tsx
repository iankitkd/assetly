
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Box, Container } from "@mui/material";
import { auth } from "@/auth";

export default async function PublicLayout({ children }: Readonly<{children: React.ReactNode}>) {
  const session = await auth();
  const isLoggedIn = !!session;
  const role = session?.user?.role;

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
      />

      <Container
        maxWidth="xl"
        component="main"
        sx={{ flexGrow: 1, p: 0, minHeight: "100vh" }}
      >
        {children}
      </Container>

      <Footer />
    </Box>
  );
}
