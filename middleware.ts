import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "never",
});

export default authMiddleware({
  beforeAuth(request) {
    return intlMiddleware(request);
  },

  // Ensure that locale-specific sign in pages are public
  publicRoutes: ["/:locale", "/:locale/sign-in", "/:locale/api"],
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
