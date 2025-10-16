"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { Player } from "@/components/player"
import { TopBar } from "@/components/top-bar"
import { PlayerProvider } from "@/contexts/player-context"
import { useState } from "react"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <PlayerProvider>
      <div className="flex h-screen overflow-hidden bg-black">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex-1 overflow-y-auto pb-20 md:pb-24">{children}</div>
        </main>

        <MobileNav />
        <Player demoMode />
      </div>
    </PlayerProvider>
  )
}
