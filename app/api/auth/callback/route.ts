import { getAccessToken } from "@/lib/spotify/auth"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    console.error("[v0] Spotify auth error:", error)
    return NextResponse.redirect(new URL("/?error=access_denied", request.url))
  }

  if (!code) {
    console.error("[v0] No code provided")
    return NextResponse.redirect(new URL("/?error=no_code", request.url))
  }

  try {
    const { access_token, refresh_token, expires_in } = await getAccessToken(code)

    const cookieStore = await cookies()

    cookieStore.set("spotify_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expires_in,
    })

    cookieStore.set("spotify_refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return NextResponse.redirect(new URL("/home?auth=success", request.url))
  } catch (error) {
    console.error("[v0] Error in callback:", error)
    return NextResponse.redirect(new URL("/?error=token_error", request.url))
  }
}
