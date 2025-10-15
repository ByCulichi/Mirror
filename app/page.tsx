import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="flex flex-col items-center gap-8 text-center max-w-md">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 1134 340" className="h-12 md:h-16 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M170 0C76.2 0 0 76.2 0 170s76.2 170 170 170 170-76.2 170-170S263.8 0 170 0zm78.1 245.3c-3.1 5.1-9.7 6.7-14.8 3.6-40.6-24.8-91.7-30.4-151.8-16.7-5.8 1.3-11.5-2.2-12.8-7.9-1.3-5.8 2.2-11.5 7.9-12.8 65.7-15 121.9-8.5 167.4 19.3 5.1 3.1 6.7 9.7 3.6 14.8zm21.1-47c-3.9 6.3-12.2 8.3-18.5 4.4-46.5-28.6-117.3-36.9-172.3-20.2-7 2.1-14.4-1.8-16.5-8.8-2.1-7 1.8-14.4 8.8-16.5 62.8-19.1 141.4-9.9 194.7 23 6.3 3.9 8.3 12.2 4.4 18.5zm1.8-48.9c-55.8-33.1-147.8-36.2-201.1-20-8.3 2.5-17.1-2.2-19.6-10.5-2.5-8.3 2.2-17.1 10.5-19.6 61-18.6 162.1-15 226.6 23.1 7.5 4.5 10 14.2 5.5 21.7-4.5 7.5-14.2 10-21.7 5.5z" />
          </svg>
          <span className="text-2xl md:text-3xl font-bold text-white">Culichi</span>
        </div>

        <p className="text-xl text-gray-400">Escucha millones de canciones y podcasts gratis.</p>

        <div className="flex flex-col gap-4 w-full mt-8">
          <Link href="/home" className="w-full">
            <Button
              size="lg"
              className="w-full bg-green-500 text-black hover:bg-green-400 font-semibold px-8 py-6 text-lg rounded-full hover:scale-105 transition-transform"
            >
              Ver Demo
            </Button>
          </Link>

          <Link href="/api/auth/login" className="w-full">
            <Button
              size="lg"
              variant="outline"
              className="w-full font-semibold px-8 py-6 text-lg rounded-full bg-transparent border-gray-600 text-white hover:border-white hover:scale-105 transition-transform"
            >
              Conectar con Spotify
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Prueba el demo sin cuenta o conecta tu Spotify para contenido personalizado
        </p>
      </div>
    </div>
  )
}
