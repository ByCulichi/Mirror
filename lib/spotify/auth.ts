import { spotifyConfig } from "./config"

export async function getAccessToken(
  code: string,
): Promise<{ access_token: string; refresh_token: string; expires_in: number }> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: spotifyConfig.redirectUri,
  })

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`).toString("base64")}`,
    },
    body: body.toString(),
  })

  if (!response.ok) {
    const errorData = await response.text()
    console.error("[v0] Spotify token error:", response.status, errorData)
    throw new Error(`Failed to get access token: ${response.status}`)
  }

  const data = await response.json()
  return data
}

export async function refreshAccessToken(refreshToken: string): Promise<{ access_token: string; expires_in: number }> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${spotifyConfig.clientId}:${spotifyConfig.clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to refresh access token")
  }

  return response.json()
}
