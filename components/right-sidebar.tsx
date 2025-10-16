"use client"

import { usePlayer } from "@/contexts/player-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import Image from "next/image"

interface RightSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  const { currentTrack } = usePlayer()

  if (!isOpen || !currentTrack) return null

  const artistName = currentTrack.artists[0]?.name || "Unknown Artist"

  const relatedVideos = [
    {
      id: "1",
      title: "Phenomenal",
      artist: artistName,
      thumbnail: "/eminem-phenomenal.jpg",
    },
    {
      id: "2",
      title: "From The D 2 The LBC",
      artist: `${artistName}, Snoop Dogg`,
      thumbnail: "/eminem-snoop-dogg.jpg",
    },
    {
      id: "3",
      title: "Venom",
      artist: artistName,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Godzilla",
      artist: `${artistName}, Juice WRLD`,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Mock data para artista - dinámico
  const artistInfo = {
    name: artistName,
    monthlyListeners: "69,597,606",
    image: currentTrack.album.images[0]?.url || "/diverse-artists-studio.png",
    bio: `Apart from being one of the best-selling artists in music history, ${artistName} is one of the greatest rappers of this generation. Known for effortlessly fast flows and powerful lyrics...`,
  }

  // Mock data para créditos - dinámico
  const credits = [
    {
      name: artistName,
      role: "Artista Principal, Productor",
    },
    {
      name: "Jeff Bass",
      role: "Composición",
    },
    {
      name: "Dr. Dre",
      role: "Productor Ejecutivo",
    },
  ]

  return (
    <aside className="hidden lg:block w-80 xl:w-96 bg-[#121212] border-l border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="font-semibold text-white">{currentTrack.name}</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-4 space-y-6">
          {/* Portada del álbum y canción actual */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={currentTrack.album.images[0]?.url || "/placeholder.svg?height=400&width=400&query=album+cover"}
                alt={currentTrack.album.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{currentTrack.name}</h3>
              <p className="text-sm text-gray-400">{currentTrack.artists.map((a) => a.name).join(", ")}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-white">Videos musicales relacionados</h3>
            <div className="grid grid-cols-2 gap-3">
              {relatedVideos.map((video) => (
                <div key={video.id} className="space-y-2 cursor-pointer group">
                  <div className="relative aspect-video rounded-md overflow-hidden bg-gray-900">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white line-clamp-1">{video.title}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{video.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Acerca del artista */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Acerca del artista</h3>
            <div className="space-y-3">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                <Image
                  src={artistInfo.image || "/placeholder.svg"}
                  alt={artistInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-lg">{artistInfo.name}</h4>
                <p className="text-sm text-gray-400">{artistInfo.monthlyListeners} oyentes mensuales</p>
                <Button className="w-full rounded-full bg-transparent border border-gray-600 text-white hover:border-white hover:scale-105 transition-all">
                  Seguir
                </Button>
                <p className="text-sm text-gray-400 line-clamp-3">{artistInfo.bio}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Créditos</h3>
              <button className="text-sm text-gray-400 hover:text-white">Mostrar todo</button>
            </div>
            <div className="space-y-3">
              {credits.map((credit, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{credit.name}</p>
                    <p className="text-xs text-gray-400">{credit.role}</p>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full bg-transparent border border-gray-600 text-white hover:border-white text-xs px-4"
                  >
                    Seguir
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
