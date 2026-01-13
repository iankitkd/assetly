import { getCartCount } from "@/actions/cart";
import { auth } from "@/auth";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Box, Container } from "@mui/material";

export default async function LandingPage() {
  const session = await auth();
  const isLoggedIn = !!session;
  const role = session?.user?.role;

  const serverCartCount = await getCartCount();

  return (
    <Box>
      <Header
        isLoggedIn={isLoggedIn}
        role={role}
        serverCartCount={serverCartCount}
      />

      <Container maxWidth="xl" component="main" sx={{ p: 2 }}>
        <HeroSection />
        <Features />
        <HowItWorks />
        <CTA />
      </Container>
      
      <Footer />
    </Box>
  );
}
