
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Box, Container } from "@mui/material";

export default function PublicLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ flexGrow: 1, p: 0, minHeight: "100vh" }}
      >
        {children}
      </Container>

      <Footer />
    </Box>
  );
}
