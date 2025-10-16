"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import {
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Mic2,
  ListMusic,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { usePlayer } from "@/contexts/player-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PlayerBar() {
  const { currentTrack, isPlaying, volume, progress, togglePlay, setVolume, setProgress, nextTrack, previousTrack } =
    usePlayer()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return

    const audio = audioRef.current

    if (currentTrack.preview_url) {
      audio.src = currentTrack.preview_url
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("[v0] Error playing audio:", error)
        })
      }
    }
  }, [currentTrack])

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    if (isPlaying && currentTrack?.preview_url) {
      audio.play().catch((error) => {
        console.error("[v0] Error playing audio:", error)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentTrack])

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const updateProgress = () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100
        setProgress(progressPercent)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [setProgress, nextTrack])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = isMuted ? 0 : volume / 100
  }, [volume, isMuted])

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current || !duration) return
    const newTime = (value[0] / 100) * duration
    audioRef.current.currentTime = newTime
    setProgress(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0

  if (!currentTrack) {
    return null
  }

  const hasPreview = !!currentTrack.preview_url

  return (
    <TooltipProvider>
      <div className="fixed bottom-0 left-0 right-0 h-20 md:h-24 bg-black border-t border-white/10 px-2 md:px-4 flex items-center gap-2 md:gap-4 z-50">
        <audio ref={audioRef} />

        {/* Track Info */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0 w-[30%]">
          <div className="relative h-12 w-12 md:h-14 md:w-14 flex-shrink-0 rounded overflow-hidden bg-surface">
            <Image
              src={currentTrack.album.images[0]?.url || "/placeholder.svg?height=56&width=56"}
              alt={currentTrack.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs md:text-sm font-semibold text-white truncate">{currentTrack.name}</p>
            <p className="text-[10px] md:text-xs text-gray-400 truncate">
              {currentTrack.artists.map((a) => a.name).join(", ")}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hidden md:flex"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-green-500 text-green-500" : ""}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-1 md:gap-2 flex-1 max-w-[40%] md:max-w-[722px]">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hidden md:flex">
              <Shuffle className="h-4 w-4" />
            </Button>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={previousTrack}
                  disabled={!hasPreview}
                >
                  <SkipBack className="h-4 w-4 fill-current" />
                </Button>
              </TooltipTrigger>
              {!hasPreview && <TooltipContent>Preview not available</TooltipContent>}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 md:h-10 md:w-10 bg-white hover:bg-white/90 text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={togglePlay}
                  disabled={!hasPreview}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                  ) : (
                    <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
                  )}
                </Button>
              </TooltipTrigger>
              {!hasPreview && <TooltipContent>Preview not available</TooltipContent>}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                  onClick={nextTrack}
                  disabled={!hasPreview}
                >
                  <SkipForward className="h-4 w-4 fill-current" />
                </Button>
              </TooltipTrigger>
              {!hasPreview && <TooltipContent>Preview not available</TooltipContent>}
            </Tooltip>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hidden md:flex">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-[10px] md:text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="flex-1"
              disabled={!hasPreview}
            />
            <span className="text-[10px] md:text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-2 justify-end w-[30%]">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={toggleMute}>
            {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider value={[isMuted ? 0 : volume]} onValueChange={handleVolumeChange} max={100} className="w-24" />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
