import { cookies } from "next/headers"
import { SpotifyClient } from "./spotify/client"

export async function getSpotifyClient(): Promise<SpotifyClient | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("spotify_access_token")?.value

  if (!accessToken) {
    return null
  }

  return new SpotifyClient(accessToken)
}

export async function requireAuth(): Promise<SpotifyClient> {
  const client = await getSpotifyClient()

  if (!client) {
    throw new Error("Not authenticated")
  }

  return client
}
