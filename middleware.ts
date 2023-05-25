import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const startsWith = (url) => request.nextUrl.pathname.startsWith(url);
  const eqTo = (url) => url === request.nextUrl.pathname;

  if (eqTo("/login")) {
    return NextResponse.redirect(new URL("/auth?mode=login", request.url));
  }
  if (eqTo("/signup")) {
    return NextResponse.redirect(new URL("/auth?mode=signup", request.url));
  }
}
