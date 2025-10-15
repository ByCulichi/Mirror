import { getSpotifyClient } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const client = await getSpotifyClient()

  if (!client) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const user = await client.getCurrentUser()
    return NextResponse.json({ authenticated: true, user })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
