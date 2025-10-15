"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { mockTracks, mockPlaylists } from "@/lib/mock-data"
import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePlayer } from "@/contexts/player-context"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<any[]>([])
  const { playTrack } = usePlayer()

  useEffect(() => {
    if (query) {
      // Filter tracks and playlists based on search query
      const trackResults = mockTracks.filter(
        (track) =>
          track.name.toLowerCase().includes(query.toLowerCase()) ||
          track.artists.some((artist) => artist.name.toLowerCase().includes(query.toLowerCase())),
      )
      const playlistResults = mockPlaylists.filter(
        (playlist) =>
          playlist.name.toLowerCase().includes(query.toLowerCase()) ||
          playlist.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults([...trackResults, ...playlistResults])
    }
  }, [query])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">{query ? `Resultados para "${query}"` : "Buscar"}</h1>

      {query && results.length === 0 && <p className="text-gray-400">No se encontraron resultados para "{query}"</p>}

      {query && results.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Canciones</h2>
            <div className="space-y-2">
              {mockTracks
                .filter(
                  (track) =>
                    track.name.toLowerCase().includes(query.toLowerCase()) ||
                    track.artists.some((artist) => artist.name.toLowerCase().includes(query.toLowerCase())),
                )
                .map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer"
                    onClick={() => playTrack(track)}
                  >
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={track.album.images[0]?.url || "/placeholder.svg"}
                        alt={track.album.name}
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-6 w-6 text-white fill-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{track.name}</p>
                      <p className="text-sm text-gray-400 truncate">{track.artists.map((a) => a.name).join(", ")}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockPlaylists
                .filter(
                  (playlist) =>
                    playlist.name.toLowerCase().includes(query.toLowerCase()) ||
                    playlist.description.toLowerCase().includes(query.toLowerCase()),
                )
                .map((playlist) => (
                  <div
                    key={playlist.id}
                    className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group"
                  >
                    <div className="relative aspect-square mb-4">
                      <Image
                        src={playlist.images[0]?.url || "/placeholder.svg"}
                        alt={playlist.name}
                        fill
                        className="object-cover rounded-md"
                      />
                      <Button
                        size="icon"
                        className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-green-500 text-black hover:bg-green-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl"
                      >
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-white truncate mb-1">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {!query && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Busca tus canciones, artistas o playlists favoritas</p>
        </div>
      )}
    </div>
  )
}
