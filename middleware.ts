import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
   DEFAULF_LOGIN_REDIRECT,
   authRoutes,
   apiAuthPrefix,
   publisRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req): Response | void => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;
   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
   const isPubliceRoute = publisRoutes.includes(nextUrl.pathname);
   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

   if (isApiAuthRoute) {
      return;
   }

   if (isAuthRoute) {
      if (isLoggedIn) {
         return Response.redirect(new URL(DEFAULF_LOGIN_REDIRECT, nextUrl));
      }
      return;
   }

   if (!isLoggedIn && !isPubliceRoute) {
      let callbackUrl = nextUrl.pathname;

      if (nextUrl.search) {
         callbackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
         new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
   }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
