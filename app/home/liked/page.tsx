"use client"

import { mockTracks } from "@/lib/mock-data"
import Image from "next/image"
import { Play, Heart, Clock, MoreHorizontal, Shuffle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlayer } from "@/contexts/player-context"

export default function LikedSongsPage() {
  const { playTrack, currentTrack, likedTracks, toggleLike } = usePlayer()

  const likedTracksArray = mockTracks.filter((t) => likedTracks.has(t.id))

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 max-w-[1955px] mx-auto">
          <div className="h-48 w-48 md:h-56 md:w-56 bg-gradient-to-br from-blue-400 via-purple-400 to-purple-600 rounded shadow-2xl flex items-center justify-center flex-shrink-0">
            <Heart className="h-20 w-20 md:h-28 md:w-28 text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-2">Playlist</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6">Tus me gusta</h1>
            <div className="flex items-center gap-2 text-sm text-white">
              <span className="font-semibold">Christian Velasco</span>
              <span>•</span>
              <span>{likedTracksArray.length} canciones</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-purple-900/40 via-[#121212] to-black p-4 md:p-6">
        <div className="max-w-[1955px] mx-auto">
          <div className="flex items-center gap-6 mb-8 mt-6">
            <Button
              size="icon"
              className="h-14 w-14 rounded-full bg-green-500 text-black hover:bg-green-400 hover:scale-105 transition-transform shadow-xl"
              onClick={() => likedTracksArray.length > 0 && playTrack(likedTracksArray[0])}
            >
              <Play className="h-6 w-6 fill-current ml-0.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white transition-colors">
              <Shuffle className="h-7 w-7" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white transition-colors">
              <Download className="h-7 w-7" />
            </Button>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-[16px_4fr_2fr_1fr_60px] gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-800 mb-2">
              <div>#</div>
              <div>Título</div>
              <div>Álbum</div>
              <div className="text-right">Fecha en que se agregó</div>
              <div className="flex justify-end">
                <Clock className="h-4 w-4" />
              </div>
            </div>

            {likedTracksArray.map((track, index) => (
              <div
                key={track.id}
                className={`grid grid-cols-[16px_4fr_2fr_1fr_60px] gap-4 px-4 py-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer ${
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
                <div className="flex items-center gap-3 min-w-0">
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
                      className={`font-semibold truncate ${
                        currentTrack?.id === track.id ? "text-green-500" : "text-white"
                      }`}
                    >
                      {track.name}
                    </p>
                    <p className="text-sm text-gray-400 truncate">{track.artists.map((a) => a.name).join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 text-sm truncate">{track.album.name}</div>
                <div className="flex items-center text-gray-400 text-sm justify-end">hace 2 horas</div>
                <div className="flex items-center justify-end gap-4 text-gray-400">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(track.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 hover:text-green-500 transition-all"
                  >
                    <Heart className="h-4 w-4 fill-green-500 text-green-500" />
                  </button>
                  <span className="text-sm w-10 text-right">
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
    </div>
  )
}
