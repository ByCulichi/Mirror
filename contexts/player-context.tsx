"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { mockTracks } from "@/lib/mock-data"

interface Track {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  duration_ms: number
  uri: string
  preview_url: string | null
  liked?: boolean // Assuming liked is a property in mockTracks
}

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  progress: number
  likedTracks: Set<string>
  rightSidebarOpen: boolean
  playTrack: (track: Track) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  setProgress: (progress: number) => void
  nextTrack: () => void
  previousTrack: () => void
  toggleLike: (trackId: string) => void
  isTrackLiked: (trackId: string) => boolean
  toggleRightSidebar: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(80)
  const [progress, setProgressState] = useState(0)
  const [queue, setQueue] = useState<Track[]>(mockTracks)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedTracks, setLikedTracks] = useState<Set<string>>(
    new Set(mockTracks.filter((t) => t.liked).map((t) => t.id)),
  )
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  const playTrack = useCallback(
    (track: Track) => {
      console.log("[v0] Playing track:", track.name)
      setCurrentTrack(track)
      setIsPlaying(!!track.preview_url)
      setProgressState(0)
      setRightSidebarOpen(true)
      const index = queue.findIndex((t) => t.id === track.id)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    },
    [queue],
  )

  const togglePlay = useCallback(() => {
    if (currentTrack?.preview_url) {
      console.log("[v0] Toggle play:", !isPlaying)
      setIsPlaying((prev) => !prev)
    }
  }, [isPlaying, currentTrack])

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
  }, [])

  const setProgress = useCallback((newProgress: number) => {
    setProgressState(newProgress)
  }, [])

  const nextTrack = useCallback(() => {
    console.log("[v0] Next track")
    const nextIndex = (currentIndex + 1) % queue.length
    setCurrentIndex(nextIndex)
    playTrack(queue[nextIndex])
  }, [currentIndex, queue, playTrack])

  const previousTrack = useCallback(() => {
    console.log("[v0] Previous track")
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    playTrack(queue[prevIndex])
  }, [currentIndex, queue, playTrack])

  const toggleLike = useCallback((trackId: string) => {
    setLikedTracks((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(trackId)) {
        newLiked.delete(trackId)
        console.log("[v0] Removed like from track:", trackId)
      } else {
        newLiked.add(trackId)
        console.log("[v0] Added like to track:", trackId)
      }
      return newLiked
    })
  }, [])

  const isTrackLiked = useCallback(
    (trackId: string) => {
      return likedTracks.has(trackId)
    },
    [likedTracks],
  )

  const toggleRightSidebar = useCallback(() => {
    setRightSidebarOpen((prev) => !prev)
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        likedTracks,
        rightSidebarOpen,
        playTrack,
        togglePlay,
        setVolume,
        setProgress,
        nextTrack,
        previousTrack,
        toggleLike,
        isTrackLiked,
        toggleRightSidebar,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
