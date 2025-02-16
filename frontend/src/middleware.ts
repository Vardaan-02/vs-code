import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken && refreshToken) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        const res = NextResponse.next();
        res.cookies.set("accessToken", accessToken, { httpOnly: true });
        return res;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
