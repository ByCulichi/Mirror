"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { Player } from "@/components/player"
import { TopBar } from "@/components/top-bar"
import { RightSidebar } from "@/components/right-sidebar"
import { PlayerProvider, usePlayer } from "@/contexts/player-context"
import { useState } from "react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

function HomeLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { rightSidebarOpen, toggleRightSidebar } = usePlayer()

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={sidebarCollapsed ? 5 : 20} minSize={5} maxSize={30} className="hidden lg:block">
          <Sidebar
            isOpen={true}
            onClose={() => {}}
            isMobile={false}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </ResizablePanel>

        <ResizableHandle className="hidden lg:block w-px bg-gray-800 hover:bg-gray-600 transition-colors" />

        <ResizablePanel defaultSize={rightSidebarOpen ? 55 : 80} minSize={40}>
          <div className="flex flex-col h-full">
            <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 overflow-y-auto pb-20 md:pb-24">{children}</div>
          </div>
        </ResizablePanel>

        {rightSidebarOpen && (
          <>
            <ResizableHandle className="hidden lg:block w-px bg-gray-800 hover:bg-gray-600 transition-colors" />
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <RightSidebar isOpen={rightSidebarOpen} onClose={toggleRightSidebar} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={true} />
      </div>

      <MobileNav />
      <Player demoMode />
    </div>
  )
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <HomeLayoutContent>{children}</HomeLayoutContent>
    </PlayerProvider>
  )
}
