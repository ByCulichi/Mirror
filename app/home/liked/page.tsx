"use client"

import { mockTracks } from "@/lib/mock-data"
import Image from "next/image"
import { Play, Heart, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlayer } from "@/contexts/player-context"
import { useState } from "react"

export default function LikedSongsPage() {
  const { playTrack, currentTrack } = usePlayer()
  const [likedTracks, setLikedTracks] = useState(mockTracks.filter((t) => t.liked))

  const toggleLike = (trackId: string) => {
    setLikedTracks((prev) => prev.filter((t) => t.id !== trackId))
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-700 to-purple-900 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6">
          <div className="h-32 w-32 md:h-48 md:w-48 bg-gradient-to-br from-purple-400 to-purple-700 rounded shadow-2xl flex items-center justify-center flex-shrink-0">
            <Heart className="h-16 w-16 md:h-24 md:w-24 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs md:text-sm font-semibold text-white mb-2">Playlist</p>
            <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6">Tus me gusta</h1>
            <div className="flex items-center gap-2 text-xs md:text-sm text-white">
              <span className="font-semibold">Christian Velasco</span>
              <span>•</span>
              <span>{likedTracks.length} canciones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-b from-purple-900/40 to-black p-4 md:p-6">
        <div className="flex items-center gap-4 md:gap-6 mb-6">
          <Button
            size="icon"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-green-500 text-black hover:bg-green-400 hover:scale-105 transition-transform"
            onClick={() => likedTracks.length > 0 && playTrack(likedTracks[0])}
          >
            <Play className="h-5 w-5 md:h-6 md:w-6 fill-current ml-0.5" />
          </Button>
        </div>

        {/* Track list */}
        <div className="space-y-1">
          <div className="hidden md:grid grid-cols-[16px_4fr_2fr_1fr_60px] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
            <div>#</div>
            <div>Título</div>
            <div>Álbum</div>
            <div className="flex justify-end">Fecha en que se agregó</div>
            <div className="flex justify-end">
              <Clock className="h-4 w-4" />
            </div>
          </div>

          {likedTracks.map((track, index) => (
            <div
              key={track.id}
              className={`grid grid-cols-[16px_1fr_60px] md:grid-cols-[16px_4fr_2fr_1fr_60px] gap-2 md:gap-4 px-2 md:px-4 py-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer ${
                currentTrack?.id === track.id ? "bg-white/10" : ""
              }`}
              onClick={() => playTrack(track)}
            >
              <div className="flex items-center text-gray-400 group-hover:text-white">
                <span className={`group-hover:hidden ${currentTrack?.id === track.id ? "text-green-500" : ""}`}>
                  {currentTrack?.id === track.id ? "♫" : index + 1}
                </span>
                <Play className="h-4 w-4 hidden group-hover:block fill-current" />
              </div>
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src={track.album.images[0]?.url || "/placeholder.svg"}
                    alt={track.album.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-semibold truncate text-sm md:text-base ${
                      currentTrack?.id === track.id ? "text-green-500" : "text-white"
                    }`}
                  >
                    {track.name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-400 truncate">
                    {track.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center text-gray-400 text-sm truncate">{track.album.name}</div>
              <div className="hidden md:flex items-center text-gray-400 text-sm">hace 2 horas</div>
              <div className="flex items-center justify-end gap-2 text-gray-400">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(track.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:text-green-500 transition-all"
                >
                  <Heart className="h-4 w-4 fill-green-500 text-green-500" />
                </button>
                <span className="text-sm">
                  {Math.floor(track.duration_ms / 60000)}:
                  {((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, "0")}
                </span>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 hover:text-white transition-all"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
