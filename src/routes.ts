export const DEFAULT_LOGIN_REDIRECT = "/discover";
export const apiAuthPrefix = "/api/auth";
export const authRoutes = ["/login", "/signup"];

export const publicRoutes = [
  "/",
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
];

export const sellerRoutes = [
  "/seller",
  "/seller/dashboard",
  "/seller/assets",
  "/seller/upload",
  "/seller/earnings",
];