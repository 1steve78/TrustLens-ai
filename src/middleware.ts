import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔐 Read auth cookie (THIS is what fixes your issue)
  const authToken = request.cookies.get("auth_token")?.value;

  // 🌍 Public routes (no auth needed)
  const publicRoutes = [
    "/auth",
    "/api/auth",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 🏠 Protected routes
  const isProtectedRoute =
    pathname.startsWith("/home") ||
    (pathname.startsWith("/api") && !pathname.startsWith("/api/auth"));

  // 🚫 Not logged in → trying to access protected route
  if (!authToken && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("reason", "auth_required");
    return NextResponse.redirect(url);
  }

  // 🔁 Logged in → trying to access auth page
  if (authToken && pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// 🎯 Tell Next.js when to run middleware
export const config = {
  matcher: [
    "/home/:path*",
    "/auth",
    "/api/:path*",
  ],
};
