import { NextRequest, NextResponse } from "next/server";
import getCookie from "./actions/getCookie";

const protedctedPrefix = "/protected";

export default async function middleware(req: NextRequest) {
  const userData = (await getCookie("userData")) as string;
  const parsedUserData = JSON.parse(userData || "{}");
  if (!parsedUserData.token && req.url.includes(protedctedPrefix)) {
    const absoluteUrl = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
