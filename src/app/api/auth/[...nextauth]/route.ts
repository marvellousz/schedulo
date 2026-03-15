// auth.ts
import { handlers } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  // Intercept the default NextAuth signin page and redirect to custom login page
  if (url.pathname === "/api/auth/signin") {
    // Preserve any search parameters (like callbackUrl or error)
    const loginUrl = new URL("/login", req.url);
    url.searchParams.forEach((value, key) => {
      loginUrl.searchParams.append(key, value);
    });
    return NextResponse.redirect(loginUrl);
  }
  return handlers.GET(req);
}

// Only export route handlers for the API route
export const { POST } = handlers;