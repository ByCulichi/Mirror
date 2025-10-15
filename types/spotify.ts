export interface SpotifyImage {
  url: string
  height: number
  width: number
}

export interface SpotifyArtist {
  id: string
  name: string
  uri: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifyAlbum {
  id: string
  name: string
  images: SpotifyImage[]
  artists: SpotifyArtist[]
  release_date: string
  total_tracks: number
  uri: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  duration_ms: number
  preview_url: string | null
  uri: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: SpotifyImage[]
  owner: {
    display_name: string
    id: string
  }
  tracks: {
    total: number
    items?: Array<{
      track: SpotifyTrack
    }>
  }
  uri: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifyUser {
  id: string
  display_name: string
  email: string
  images: SpotifyImage[]
  product: string
}

export interface SpotifyPlaybackState {
  is_playing: boolean
  progress_ms: number
  item: SpotifyTrack | null
  shuffle_state: boolean
  repeat_state: "off" | "track" | "context"
}
