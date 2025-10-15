import { SPOTIFY_AUTH_URL } from "@/lib/spotify/config"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.redirect(SPOTIFY_AUTH_URL)
}
