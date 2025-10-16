"use client"

import type React from "react"

import { ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HamburgerMenuProps {
  children: React.ReactNode
}

export function HamburgerMenu({ children }: HamburgerMenuProps) {
  const menuItems = [
    { label: "Archivo", hasSubmenu: true },
    { label: "Editar", hasSubmenu: true },
    { label: "Ver", hasSubmenu: true },
    { label: "Reproducción", hasSubmenu: true },
    { label: "Ayuda", hasSubmenu: true },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-[#282828] border-gray-700 text-white p-2">
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className="flex items-center justify-between px-3 py-2 hover:bg-white/10 cursor-pointer rounded-sm"
          >
            <span className="text-sm">{item.label}</span>
            {item.hasSubmenu && <ChevronRight className="h-4 w-4 text-gray-400" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
