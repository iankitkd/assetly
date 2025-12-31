// export { auth as proxy } from "@/auth"

import { auth } from "@/auth";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes, sellerRoutes } from "@/routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const { pathname, search } = nextUrl;

  const isLoggedIn = !!session;
  const user = session?.user;
  // console.log(user, "user")

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isSellerRoute = sellerRoutes.some((route) => pathname.startsWith(route));
  const isOnboardingRoute = pathname.startsWith("/onboarding");

  // Allow API auth endpoints
  if (isApiAuthRoute) return NextResponse.next();

  if(isLoggedIn) {
    // Logged in but role not chosen
    if (!user?.role && !isOnboardingRoute) {
      return NextResponse.redirect(new URL("/onboarding/role", nextUrl));
    }

    // If logged in, redirect away from login/signup pages
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    // Seller-only route protection
    if (isSellerRoute && user?.role !== "SELLER") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
  }

  // If not logged in and trying to access protected routes
  if (!isPublicRoute) {
    console.log("called redirect");
    const callbackUrl = pathname + search;
    return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|logos).*)']
};