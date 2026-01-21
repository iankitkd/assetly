import { ShoppingCartIcon } from "@/components/icons";
import { Button } from "@mui/material";

interface AddToCartButtonProps {
  onAdd: () => void;
  isInCartStatus: boolean;
}

export default function AddToCartButton({
  onAdd,
  isInCartStatus,
}: AddToCartButtonProps) {
  return (
    <Button
      size="large"
      fullWidth
      variant="contained"
      startIcon={<ShoppingCartIcon />}
      onClick={onAdd}
      data-testid="cart-action-button"
    >
      {isInCartStatus ? "Go to Cart" : "Add to Cart"}
    </Button>
  );
}
