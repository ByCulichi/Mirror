"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    fetch("/api/auth/check")
      .then((res) => {
        if (!res.ok) {
          router.push("/")
        }
      })
      .catch(() => {
        router.push("/")
      })
  }, [router])

  return <>{children}</>
}
