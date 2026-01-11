export const DEFAULT_LOGIN_REDIRECT = "/discover";
export const apiPrefix = "/api";

export const authRoutes = ["/login", "/signup"];

export const publicRoutes = [
  // "/",
  "/discover", 
  "/about", 
  "/login", 
  "/signup",
  "/assets",
  "/cart",
];

export const protectedRoutes = [
  "/dashboard",     // Common dashboard
  "/profile",
  "/settings",
  "/orders",
  "/library",
  "/checkout",
];

export const sellerRoutes = [
  "/assets",
  "/assets/new",
  "/earnings",
];