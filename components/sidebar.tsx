"use client"

import { Library, Plus, Heart, X } from "lucide-react"
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
    "Mix diario 1",
    "Mix diario 2",
    "Mix diario 3",
    "Descubrimiento semanal",
    "Release Radar",
    "Tus mejores canciones 2024",
  ])

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      setPlaylists([...playlists, playlistName])
      setShowCreatePlaylist(false)
      setPlaylistName("")
    }
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
            className="absolute top-4 right-4 lg:hidden h-8 w-8 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        )}

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
                href="/liked"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors group"
                onClick={onClose}
              >
                <div className="h-12 w-12 bg-gradient-to-br from-purple-700 to-purple-400 rounded flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-white fill-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-white truncate">Canciones que te gustan</p>
                  <p className="text-xs text-gray-400">Playlist • 234 canciones</p>
                </div>
              </Link>

              {playlists.map((playlist, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <div className="h-12 w-12 bg-[#282828] rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{playlist}</p>
                    <p className="text-xs text-gray-400">Playlist</p>
                  </div>
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
