import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
import { Background } from '@/components/Background'
import { Cursor } from '@/components/Cursor'
import { Nav } from '@/components/Nav'
import { Preloader } from '@/components/Preloader'
import { SmoothScroll } from '@/components/SmoothScroll'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Hussain Nasir | Software Engineer, AI/ML',
  description:
    'I build intelligent systems that work in the real world, from healthcare workflows to autonomous drones.',
  openGraph: {
    title: 'Hussain Nasir | Software Engineer, AI/ML',
    description:
      'I build intelligent systems that work in the real world, from healthcare workflows to autonomous drones.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-text antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[400] focus:rounded focus:bg-bg-elevated focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-accent"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <Background />
          <div className="grain" aria-hidden />
          <Nav />
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
