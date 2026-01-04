import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected =
    pathname.startsWith("/home") ||
    pathname.startsWith("/simulate") ||
    pathname.startsWith("/api");

  const isAuthRoute = pathname.startsWith("/api/auth");

  if (isProtected && !isAuthRoute && !token) {
    // 🔒 API → return 401
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔁 Pages → redirect
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/home/:path*",
    "/simulate/:path*",
    "/api/:path*",
  ],
};
