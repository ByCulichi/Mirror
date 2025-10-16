"use client"

import { useRouter } from "next/navigation"

const categories = [
  { id: "music", name: "Música", color: "bg-pink-500", image: "/placeholder.svg?height=200&width=200" },
  {
    id: "podcasts",
    name: "Podcasts",
    color: "bg-teal-600",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "live",
    name: "Eventos en vivo",
    color: "bg-purple-600",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "made-for-you",
    name: "Creado para ti",
    color: "bg-blue-600",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "new-releases",
    name: "Nuevos lanzamientos",
    color: "bg-lime-500",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "mexican",
    name: "Música Mexicana",
    color: "bg-gray-500",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: "latina", name: "Latina", color: "bg-blue-500", image: "/placeholder.svg?height=200&width=200" },
  {
    id: "mexico",
    name: "Música de México",
    color: "bg-pink-600",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: "hip-hop", name: "Hip hop", color: "bg-slate-600", image: "/placeholder.svg?height=200&width=200" },
  {
    id: "rankings",
    name: "Rankings",
    color: "bg-purple-500",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "podcast-rankings",
    name: "Ranking de podcasts",
    color: "bg-blue-600",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "new-podcasts",
    name: "Nuevos Podcasts",
    color: "bg-purple-400",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "videopodcasts",
    name: "Videopodcasts",
    color: "bg-orange-600",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: "comedy", name: "Comedia", color: "bg-pink-600", image: "/placeholder.svg?height=200&width=200" },
  {
    id: "car",
    name: "En el auto",
    color: "bg-blue-800",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: "pop", name: "Pop", color: "bg-sky-400", image: "/placeholder.svg?height=200&width=200" },
  {
    id: "dance",
    name: "Dance/Electrónica",
    color: "bg-gray-600",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: "cumbia", name: "Cumbia", color: "bg-sky-500", image: "/placeholder.svg?height=200&width=200" },
  {
    id: "discover",
    name: "Descubre",
    color: "bg-purple-500",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: "salsa", name: "Salsa", color: "bg-red-600", image: "/placeholder.svg?height=200&width=200" },
  { id: "rock", name: "Rock", color: "bg-yellow-600", image: "/placeholder.svg?height=200&width=200" },
]

export default function BrowsePage() {
  const router = useRouter()

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-900 to-black">
      <div className="p-6">
        <h1 className="text-4xl font-bold text-white mb-6">Explorar todo</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => router.push(`/home/genre/${category.id}`)}
              className={`${category.color} relative h-40 rounded-lg overflow-hidden group hover:scale-105 transition-transform`}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <h3 className="text-white text-xl font-bold text-left">{category.name}</h3>
                <div className="absolute bottom-0 right-0 w-24 h-24 transform translate-x-4 translate-y-4 rotate-25">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover rounded shadow-lg"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
