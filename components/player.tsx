"use client"

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  Mic2,
  ListMusic,
  MonitorSpeaker,
  Maximize2,
  PictureInPicture2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { usePlayer } from "@/contexts/player-context"
import { mockCurrentTrack } from "@/lib/mock-data"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface PlayerProps {
  demoMode?: boolean
}

export function Player({ demoMode }: PlayerProps) {
  const { currentTrack, isPlaying, volume, progress, togglePlay, setVolume, setProgress, nextTrack, previousTrack } =
    usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showVolumeLevel, setShowVolumeLevel] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(volume)
  const [isLiked, setIsLiked] = useState(false)
  const [isDraggingProgress, setIsDraggingProgress] = useState(false)
  const [isDraggingVolume, setIsDraggingVolume] = useState(false)

  const track = currentTrack || mockCurrentTrack

  useEffect(() => {
    if (!audioRef.current && typeof window !== "undefined") {
      audioRef.current = new Audio()
      audioRef.current.volume = volume / 100
    }

    if (audioRef.current && track.preview_url) {
      if (audioRef.current.src !== track.preview_url) {
        audioRef.current.src = track.preview_url
        audioRef.current.load()
      }

      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("[v0] Audio play error:", err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, track.preview_url])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) return

    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
        setProgress(currentProgress)
      }
    }

    const handleEnded = () => {
      nextTrack()
    }

    audioRef.current.addEventListener("timeupdate", updateProgress)
    audioRef.current.addEventListener("ended", handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress)
        audioRef.current.removeEventListener("ended", handleEnded)
      }
    }
  }, [setProgress, nextTrack])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleProgressChange = (value: number[]) => {
    const newProgress = value[0]
    setProgress(newProgress)
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setShowVolumeLevel(true)
    setIsMuted(newVolume === 0)
    setTimeout(() => setShowVolumeLevel(false), 1000)
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume)
      setIsMuted(false)
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setIsMuted(true)
    }
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 z-50 h-20 md:h-24">
      <div className="flex items-center justify-between h-full px-2 md:px-4 gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1 max-w-[30%]">
          <div className="relative h-12 w-12 md:h-14 md:w-14 flex-shrink-0 rounded overflow-hidden bg-gray-800">
            <Image
              src={track.album.images[0]?.url || "/martin-solveig-hello-album-cover.jpg"}
              alt={track.album.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 hidden sm:block">
            <p className="text-xs md:text-sm font-medium truncate text-white hover:underline cursor-pointer">
              {track.name}
            </p>
            <p className="text-[10px] md:text-xs text-gray-400 truncate hover:underline cursor-pointer">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "hidden md:flex h-8 w-8 transition-colors",
              isLiked ? "text-green-500 hover:text-green-400" : "text-gray-400 hover:text-white",
            )}
            onClick={toggleLike}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex h-8 w-8 text-gray-400 hover:text-white">
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white"
              onClick={previousTrack}
            >
              <SkipBack className="h-4 w-4 md:h-5 md:w-5 fill-current" />
            </Button>

            <Button
              size="icon"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-transform"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 md:h-5 md:w-5 fill-current" />
              ) : (
                <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
              )}
            </Button>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={nextTrack}>
              <SkipForward className="h-4 w-4 md:h-5 md:w-5 fill-current" />
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex h-8 w-8 text-gray-400 hover:text-white">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-2xl">
            <span className="text-[10px] md:text-xs text-gray-400 w-8 md:w-10 text-right">
              {formatTime((progress / 100) * track.duration_ms)}
            </span>
            <div
              className="flex-1"
              onMouseDown={() => setIsDraggingProgress(true)}
              onMouseUp={() => setIsDraggingProgress(false)}
              onMouseLeave={() => setIsDraggingProgress(false)}
            >
              <Slider
                value={[progress]}
                onValueChange={handleProgressChange}
                max={100}
                step={0.1}
                className={cn("cursor-pointer", isDraggingProgress && "[&_[role=slider]]:bg-green-500")}
              />
            </div>
            <span className="text-[10px] md:text-xs text-gray-400 w-8 md:w-10">{formatTime(track.duration_ms)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 flex-1 justify-end max-w-[30%]">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8 text-gray-400 hover:text-white"
            title="Letras"
          >
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8 text-gray-400 hover:text-white"
            title="Cola de reproducción"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex h-8 w-8 text-gray-400 hover:text-white"
            title="Conectar a un dispositivo"
          >
            <MonitorSpeaker className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-8 w-8 text-gray-400 hover:text-white"
            onClick={toggleMute}
          >
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <div
            className="relative hidden md:block"
            onMouseDown={() => setIsDraggingVolume(true)}
            onMouseUp={() => setIsDraggingVolume(false)}
            onMouseLeave={() => setIsDraggingVolume(false)}
          >
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className={cn("w-16 lg:w-24", isDraggingVolume && "[&_[role=slider]]:bg-green-500")}
            />
            {showVolumeLevel && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                {Math.round(volume)}%
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden xl:flex h-8 w-8 text-gray-400 hover:text-white"
            title="Minireproductor"
          >
            <PictureInPicture2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden xl:flex h-8 w-8 text-gray-400 hover:text-white"
            title="Pantalla completa"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
