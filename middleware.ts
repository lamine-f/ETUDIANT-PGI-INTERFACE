import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname

  // Define paths that are considered public (don't need authentication)
  const isPublicPath = path === "/"

  // Get the token from cookies
  const token = request.cookies.get("authToken")?.value || ""

  // If the user is on a protected path and doesn't have a token, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If the user is on the login page but already has a token, redirect to results
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/results", request.url))
  }

  // Otherwise, continue with the request
  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/", "/results/:path*"],
}
