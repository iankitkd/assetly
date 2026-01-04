
import { getCartItems } from "@/actions/cart";
import Cart from "@/components/commerce/Cart";
import { Container, Typography } from "@mui/material";

export default async function CartPage() {
  const cartItems = await getCartItems();

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Your Cart
      </Typography>

      <Cart items={cartItems} />
    </Container>
  );
}
