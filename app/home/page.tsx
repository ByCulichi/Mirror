"use client"

import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockPlaylists, mockDailyMixes, mockBackToYourMusic, mockTracks, mockPodcasts } from "@/lib/mock-data"
import { usePlayer } from "@/contexts/player-context"
import { useState } from "react"

export default function HomePage() {
  const { playTrack } = usePlayer()
  const [activeTab, setActiveTab] = useState<"todo" | "musica" | "podcasts">("todo")

  const handlePlayPlaylist = (playlist: any, trackIndex = 0) => {
    const track = mockTracks[trackIndex % mockTracks.length]
    playTrack(track)
  }

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
      <div className="flex gap-2 md:gap-4 mb-4 md:mb-6">
        <button
          onClick={() => setActiveTab("todo")}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
            activeTab === "todo" ? "bg-white text-black" : "hover:bg-surface text-gray-400 hover:text-white"
          }`}
        >
          Todo
        </button>
        <button
          onClick={() => setActiveTab("musica")}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
            activeTab === "musica" ? "bg-white text-black" : "hover:bg-surface text-gray-400 hover:text-white"
          }`}
        >
          Música
        </button>
        <button
          onClick={() => setActiveTab("podcasts")}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
            activeTab === "podcasts" ? "bg-white text-black" : "hover:bg-surface text-gray-400 hover:text-white"
          }`}
        >
          Podcasts
        </button>
      </div>

      {activeTab === "podcasts" ? (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {mockPodcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="group bg-gradient-to-br from-orange-900/40 to-orange-950/40 hover:from-orange-900/60 hover:to-orange-950/60 rounded-lg overflow-hidden transition-all cursor-pointer"
              >
                <div className="flex gap-4 p-4">
                  <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={podcast.images[0]?.url || "/placeholder.svg"}
                      alt={podcast.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-base text-white mb-1 line-clamp-2">{podcast.name}</h3>
                    <p className="text-xs text-gray-400">{podcast.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4">
              {mockPlaylists.slice(0, 8).map((playlist, index) => (
                <div
                  key={playlist.id}
                  className="group bg-white/10 hover:bg-white/20 rounded-md transition-all flex items-center gap-3 md:gap-4 p-2 overflow-hidden cursor-pointer relative"
                  onClick={() => handlePlayPlaylist(playlist, index)}
                >
                  <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 rounded overflow-hidden bg-surface">
                    <Image
                      src={playlist.images[0]?.url || "/placeholder.svg"}
                      alt={playlist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-xs md:text-sm truncate flex-1 text-white">{playlist.name}</h3>
                  <Button
                    size="icon"
                    className="absolute right-2 h-10 w-10 md:h-12 md:w-12 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-400 hover:scale-105 text-black rounded-full shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayPlaylist(playlist, index)
                    }}
                  >
                    <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Hecho para Christian Velasco</h2>
              <Link
                href="/section/made-for-you"
                className="text-xs md:text-sm text-gray-400 hover:text-white hover:underline"
              >
                Mostrar todo
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {mockDailyMixes.map((mix, index) => (
                <div
                  key={mix.id}
                  className="group bg-white/5 hover:bg-white/10 p-3 md:p-4 rounded-lg transition-colors cursor-pointer relative"
                  onClick={() => handlePlayPlaylist(mix, index)}
                >
                  <div className="relative aspect-square mb-3 md:mb-4 rounded overflow-hidden bg-surface shadow-lg">
                    <Image
                      src={mix.images[0]?.url || "/placeholder.svg"}
                      alt={mix.name}
                      fill
                      className="object-cover"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 h-10 w-10 md:h-12 md:w-12 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all bg-green-500 hover:bg-green-400 hover:scale-105 text-black rounded-full shadow-xl"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayPlaylist(mix, index)
                      }}
                    >
                      <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-xs md:text-sm mb-1 truncate text-white">{mix.name}</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 line-clamp-2">{mix.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-white">Vuelve a tu música</h2>
              <Link
                href="/section/back-to-music"
                className="text-xs md:text-sm text-gray-400 hover:text-white hover:underline"
              >
                Mostrar todo
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {mockBackToYourMusic.slice(0, 10).map((item, index) => (
                <div
                  key={item.id}
                  className="group bg-white/5 hover:bg-white/10 p-3 md:p-4 rounded-lg transition-colors cursor-pointer relative"
                  onClick={() => handlePlayPlaylist(item, index)}
                >
                  <div className="relative aspect-square mb-3 md:mb-4 rounded overflow-hidden bg-surface shadow-lg">
                    <Image
                      src={item.images[0]?.url || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-2 right-2 h-10 w-10 md:h-12 md:w-12 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all bg-green-500 hover:bg-green-400 hover:scale-105 text-black rounded-full shadow-xl"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlayPlaylist(item, index)
                      }}
                    >
                      <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-xs md:text-sm mb-1 truncate text-white">{item.name}</h3>
                  <p className="text-[10px] md:text-xs text-gray-400 truncate">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
