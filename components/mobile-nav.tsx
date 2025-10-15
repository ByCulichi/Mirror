"use client"

import { Home, Search, Library } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Library", href: "/library", icon: Library },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-20 left-0 right-0 bg-surface-elevated border-t border-border z-40">
      <div className="flex items-center justify-around px-4 py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-md transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
