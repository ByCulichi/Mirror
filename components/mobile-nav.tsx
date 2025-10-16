"use client"

import { Home, Search, Library } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigation = [
  { name: "Inicio", href: "/home", icon: Home },
  { name: "Buscar", href: "/search", icon: Search },
  { name: "Biblioteca", href: "/library", icon: Library },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-20 left-0 right-0 bg-black border-t border-gray-800 z-40">
      <TooltipProvider>
        <div className="flex items-center justify-around px-2 py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Tooltip key={item.name} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 px-4 py-2 rounded-md transition-all duration-200",
                      isActive ? "text-white" : "text-gray-400 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <item.icon className={cn("h-6 w-6 transition-all duration-200", isActive && "scale-110")} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-[#282828] text-white border-gray-700">
                  <p className="text-xs">{item.name}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </nav>
  )
}
