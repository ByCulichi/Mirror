"use client"

import type React from "react"

import { Library, Plus, Heart, X, Trash2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [playlistName, setPlaylistName] = useState("")
  const [playlists, setPlaylists] = useState([
    { id: "1", name: "Mix diario 1", image: "/placeholder.svg?height=48&width=48" },
    { id: "2", name: "Mix diario 2", image: "/placeholder.svg?height=48&width=48" },
  ])

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      setPlaylists([
        ...playlists,
        {
          id: Date.now().toString(),
          name: playlistName,
          image: "/placeholder.svg?height=48&width=48",
        },
      ])
      setShowCreatePlaylist(false)
      setPlaylistName("")
    }
  }

  const handleDeletePlaylist = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPlaylists(playlists.filter((p) => p.id !== id))
  }

  return (
    <>
      {isOpen && onClose && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 lg:z-0 flex flex-col w-[280px] xl:w-[320px] bg-black h-full gap-2 p-2 transition-transform duration-300",
          !isOpen && "lg:flex -translate-x-full lg:translate-x-0",
          isOpen && "translate-x-0",
        )}
      >
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 lg:hidden h-8 w-8 text-white hover:bg-white/10 z-10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="bg-[#121212] rounded-lg p-4">
          <Link href="/home" className="flex items-center gap-2" onClick={onClose}>
            <div className="h-8 w-8 bg-white rounded-sm flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            </div>
            <span className="font-bold text-white text-lg">Culichi</span>
          </Link>
        </div>

        <div className="flex-1 bg-[#121212] rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <button
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              onClick={() => router.push("/library")}
            >
              <Library className="h-6 w-6" />
              <span className="font-bold text-sm">Tu biblioteca</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
              onClick={() => setShowCreatePlaylist(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 p-2">
              <Link
                href="/home/liked"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors group"
                onClick={onClose}
              >
                <div className="h-12 w-12 bg-gradient-to-br from-purple-700 to-purple-400 rounded flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-white fill-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white truncate">Canciones que te gustan</p>
                  <p className="text-xs text-gray-400">Playlist • 6 canciones</p>
                </div>
              </Link>

              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer group"
                  onClick={onClose}
                >
                  <div className="relative h-12 w-12 bg-[#282828] rounded flex-shrink-0 overflow-hidden">
                    <Image
                      src={playlist.image || "/placeholder.svg"}
                      alt={playlist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{playlist.name}</p>
                    <p className="text-xs text-gray-400">Playlist</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    onClick={(e) => handleDeletePlaylist(playlist.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>

      <Dialog open={showCreatePlaylist} onOpenChange={setShowCreatePlaylist}>
        <DialogContent className="bg-[#282828] text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Crear playlist</DialogTitle>
            <DialogDescription className="text-gray-400">Dale un nombre a tu nueva playlist</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Mi playlist #1"
                className="bg-[#3e3e3e] border-gray-600 text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreatePlaylist()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreatePlaylist(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePlaylist} className="bg-white text-black hover:bg-gray-200">
              Crear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
