import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Clerk middleware is disabled until API keys are configured.
// Once you add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
// to your environment, replace this file with:
//
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// const isProtectedRoute = createRouteMatcher(["/admin(.*)", "/app(.*)"]);
// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) { await auth.protect(); }
// });

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
