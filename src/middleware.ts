import { NextRequest, NextResponse } from "next/server";
import getCookie from "./actions/getCookie";

const protectedPrefix = ["/dashboard", "/admin", "/profile"];

export default async function middleware(req: NextRequest) {
  try {
    const userData = (await getCookie("userData")) as string;
    const parsedUserData = JSON.parse(userData || "{}");

    const isProtectedRoute = protectedPrefix.some((prefix) =>
      req.url.includes(prefix)
    );

    if (isProtectedRoute && !parsedUserData.token) {
      const absoluteUrl = new URL("/signin", req.nextUrl.origin);
      return NextResponse.redirect(absoluteUrl.toString());
    }
  } catch (error) {
    console.error("Erro no middleware:", error);

    const absoluteUrl = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  return NextResponse.next();
}
