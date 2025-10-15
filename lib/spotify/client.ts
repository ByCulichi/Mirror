import type {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyPlaylist,
  SpotifyTrack,
  SpotifyUser,
  SpotifyPlaybackState,
} from "@/types/spotify"

const SPOTIFY_API_BASE = "https://api.spotify.com/v1"

export class SpotifyClient {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`)
    }

    return response.json()
  }

  // User methods
  async getCurrentUser(): Promise<SpotifyUser> {
    return this.fetch<SpotifyUser>("/me")
  }

  // Playlist methods
  async getUserPlaylists(limit = 20): Promise<{ items: SpotifyPlaylist[] }> {
    return this.fetch<{ items: SpotifyPlaylist[] }>(`/me/playlists?limit=${limit}`)
  }

  async getPlaylist(playlistId: string): Promise<SpotifyPlaylist> {
    return this.fetch<SpotifyPlaylist>(`/playlists/${playlistId}`)
  }

  async createPlaylist(userId: string, name: string, description?: string): Promise<SpotifyPlaylist> {
    return this.fetch<SpotifyPlaylist>(`/users/${userId}/playlists`, {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
        public: false,
      }),
    })
  }

  // Track methods
  async getSavedTracks(limit = 20): Promise<{ items: Array<{ track: SpotifyTrack }> }> {
    return this.fetch<{ items: Array<{ track: SpotifyTrack }> }>(`/me/tracks?limit=${limit}`)
  }

  async getRecentlyPlayed(limit = 20): Promise<{ items: Array<{ track: SpotifyTrack }> }> {
    return this.fetch<{ items: Array<{ track: SpotifyTrack }> }>(`/me/player/recently-played?limit=${limit}`)
  }

  // Album methods
  async getNewReleases(limit = 20): Promise<{ albums: { items: SpotifyAlbum[] } }> {
    return this.fetch<{ albums: { items: SpotifyAlbum[] } }>(`/browse/new-releases?limit=${limit}`)
  }

  async getAlbum(albumId: string): Promise<SpotifyAlbum> {
    return this.fetch<SpotifyAlbum>(`/albums/${albumId}`)
  }

  // Artist methods
  async getArtist(artistId: string): Promise<SpotifyArtist> {
    return this.fetch<SpotifyArtist>(`/artists/${artistId}`)
  }

  // Search methods
  async search(query: string, types: string[] = ["track", "album", "artist", "playlist"], limit = 20) {
    const typeString = types.join(",")
    return this.fetch(`/search?q=${encodeURIComponent(query)}&type=${typeString}&limit=${limit}`)
  }

  // Playback methods
  async getPlaybackState(): Promise<SpotifyPlaybackState | null> {
    try {
      return await this.fetch<SpotifyPlaybackState>("/me/player")
    } catch {
      return null
    }
  }

  async play(uris?: string[], contextUri?: string): Promise<void> {
    await this.fetch("/me/player/play", {
      method: "PUT",
      body: JSON.stringify({
        uris,
        context_uri: contextUri,
      }),
    })
  }

  async pause(): Promise<void> {
    await this.fetch("/me/player/pause", {
      method: "PUT",
    })
  }

  async next(): Promise<void> {
    await this.fetch("/me/player/next", {
      method: "POST",
    })
  }

  async previous(): Promise<void> {
    await this.fetch("/me/player/previous", {
      method: "POST",
    })
  }

  async setShuffle(state: boolean): Promise<void> {
    await this.fetch(`/me/player/shuffle?state=${state}`, {
      method: "PUT",
    })
  }

  async setRepeat(state: "off" | "track" | "context"): Promise<void> {
    await this.fetch(`/me/player/repeat?state=${state}`, {
      method: "PUT",
    })
  }
}
