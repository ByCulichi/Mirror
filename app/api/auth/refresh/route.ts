import { refreshAccessToken } from "@/lib/spotify/auth"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 })
  }

  try {
    const { access_token, expires_in } = await refreshAccessToken(refreshToken)

    cookieStore.set("spotify_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expires_in,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error refreshing token:", error)
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 })
  }
}
