"use client"

import { mockPlaylists } from "@/lib/mock-data"
import Image from "next/image"
import { Play, Heart, MoreVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState(mockPlaylists)

  const handleDeletePlaylist = (playlistId: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId))
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Tu Biblioteca</h1>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="bg-transparent border-b border-gray-800 rounded-none w-full justify-start gap-4 mb-6">
          <TabsTrigger
            value="playlists"
            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none text-gray-400 data-[state=active]:text-white"
          >
            Playlists
          </TabsTrigger>
          <TabsTrigger
            value="artists"
            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none text-gray-400 data-[state=active]:text-white"
          >
            Artistas
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none text-gray-400 data-[state=active]:text-white"
          >
            Álbumes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            <Link
              href="/liked"
              className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group"
            >
              <div className="relative aspect-square mb-3 md:mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-400 rounded-md flex items-center justify-center">
                  <Heart className="h-12 w-12 md:h-16 md:w-16 text-white fill-white" />
                </div>
                <Button
                  size="icon"
                  className="absolute bottom-2 right-2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-500 text-black hover:bg-green-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl"
                >
                  <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
                </Button>
              </div>
              <h3 className="font-semibold text-sm md:text-base text-white truncate mb-1">Canciones que te gustan</h3>
              <p className="text-xs md:text-sm text-gray-400">234 canciones</p>
            </Link>

            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-[#181818] p-3 md:p-4 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer group relative"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-black/50 hover:bg-black/70"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#282828] border-gray-700">
                    <DropdownMenuItem
                      className="text-red-500 focus:text-red-400 focus:bg-white/10 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeletePlaylist(playlist.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar de la biblioteca
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative aspect-square mb-3 md:mb-4">
                  <Image
                    src={playlist.images[0]?.url || "/placeholder.svg"}
                    alt={playlist.name}
                    fill
                    className="object-cover rounded-md"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-500 text-black hover:bg-green-400 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl"
                  >
                    <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
                  </Button>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-white truncate mb-1">{playlist.name}</h3>
                <p className="text-xs md:text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="mt-0">
          <div className="text-center py-20">
            <p className="text-gray-400">No tienes artistas guardados todavía</p>
          </div>
        </TabsContent>

        <TabsContent value="albums" className="mt-0">
          <div className="text-center py-20">
            <p className="text-gray-400">No tienes álbumes guardados todavía</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
