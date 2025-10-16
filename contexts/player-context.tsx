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
}

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  progress: number
  playTrack: (track: Track) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  setProgress: (progress: number) => void
  nextTrack: () => void
  previousTrack: () => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(80)
  const [progress, setProgressState] = useState(0)
  const [queue, setQueue] = useState<Track[]>(mockTracks)
  const [currentIndex, setCurrentIndex] = useState(0)

  const playTrack = useCallback(
    (track: Track) => {
      console.log("[v0] Playing track:", track.name)
      setCurrentTrack(track)
      setIsPlaying(!!track.preview_url)
      setProgressState(0)
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

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        playTrack,
        togglePlay,
        setVolume,
        setProgress,
        nextTrack,
        previousTrack,
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
