import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // 多分ちゃんとユーザーステータスを取得しているんだと思う
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });
  await supabase.auth.getSession();

  // URLマッチショートカット
  const url = request.nextUrl.pathname;
  const startsWith = (url) => request.nextUrl.pathname.startsWith(url);
  const eqTo = (url) => url === request.nextUrl.pathname;

  // ログインなしで許可するURL
  // ServiceWorker等をブロックしてはいけない
  const nologin = ["/", "/auth", "/callback", "/sw.js"];
  // _nextとか/apiを制限したらあかんので...
  if (startsWith("/_next") || startsWith("/api") || startsWith("/workbox-")) {
    return res;
  }

  // リダイレクト処理
  if (eqTo("/login")) {
    return NextResponse.redirect(new URL("/auth?mode=login", request.url));
  }
  if (eqTo("/signup")) {
    return NextResponse.redirect(new URL("/auth?mode=signup", request.url));
  }
  if (nologin.indexOf(url) === -1) {
    // Auth condition not met, redirect to home page.
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("mode", "login");
    redirectUrl.searchParams.set(`moveto`, request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // プロフィールを確認する
  return res;
}
