import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const startsWith = (url) => request.nextUrl.pathname.startsWith(url);
  if (startsWith("/login")) {
    return NextResponse.redirect(new URL("/auth?initmode=login", request.url));
  }
  if (startsWith("/signup")) {
    return NextResponse.redirect(new URL("/auth?initmode=signup", request.url));
  }
}
