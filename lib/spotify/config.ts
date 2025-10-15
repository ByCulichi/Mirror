export const spotifyConfig = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || "http://localhost:3000/api/auth/callback",
}

export const SPOTIFY_SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "streaming",
].join(" ")

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${spotifyConfig.clientId}&response_type=code&redirect_uri=${encodeURIComponent(spotifyConfig.redirectUri)}&scope=${encodeURIComponent(SPOTIFY_SCOPES)}`
