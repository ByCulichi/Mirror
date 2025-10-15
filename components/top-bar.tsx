"use client"

import type React from "react"

import { ChevronLeft, ChevronRight, Home, Search, Bell, User, MoreHorizontal, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TopBarProps {
  onToggleSidebar?: () => void
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-black px-4 py-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-8 w-8 rounded-full text-white hover:bg-white/10"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex h-8 w-8 rounded-full text-white hover:bg-white/10"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-white/10"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-white/10 opacity-50"
          onClick={() => router.forward()}
          disabled
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-1 max-w-xl">
        <Button
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full bg-[#242424] text-white hover:bg-[#2a2a2a]"
          onClick={() => router.push("/home")}
        >
          <Home className="h-5 w-5" />
        </Button>
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="¿Qué quieres reproducir?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[#242424] border-0 rounded-full text-white placeholder:text-gray-400 hover:bg-[#2a2a2a] focus:bg-[#333] focus:ring-2 focus:ring-white/10"
          />
        </form>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-blue-500 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#282828] border-gray-700 text-white">
            <div className="p-4">
              <h3 className="font-bold mb-3">Notificaciones</h3>
              <div className="space-y-3">
                <DropdownMenuItem className="flex flex-col items-start p-3 hover:bg-white/10 cursor-pointer">
                  <p className="font-semibold text-sm">Nuevo álbum disponible</p>
                  <p className="text-xs text-gray-400">Martin Solveig lanzó un nuevo álbum</p>
                  <p className="text-xs text-gray-500 mt-1">Hace 2 horas</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 hover:bg-white/10 cursor-pointer">
                  <p className="font-semibold text-sm">Playlist actualizada</p>
                  <p className="text-xs text-gray-400">Tu Mix diario 1 tiene nuevas canciones</p>
                  <p className="text-xs text-gray-500 mt-1">Hace 5 horas</p>
                </DropdownMenuItem>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#282828] border-gray-700 text-white">
            <DropdownMenuItem
              onClick={() => router.push("/api/auth/login")}
              className="hover:bg-white/10 cursor-pointer"
            >
              Iniciar sesión con Spotify
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">Perfil</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">Configuración</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
