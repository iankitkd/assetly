const CART_KEY = "assetly_cart";

export const getGuestCart = (): string[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

export const getGuestCartCount = (): number => {
  if (typeof window === "undefined") return 0;
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  return cart.length;
};

export const isInGuestCart = (assetId: string): boolean => {
  const cart = getGuestCart();
  return cart.includes(assetId);
};

export const addToGuestCart = (assetId: string) => {
  const cart = getGuestCart();
  if (!cart.includes(assetId)) {
    cart.push(assetId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
};

export const removeFromGuestCart = (assetId: string) => {
  const cart = getGuestCart().filter((id) => id !== assetId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearGuestCart = () => {
  localStorage.removeItem(CART_KEY);
};
