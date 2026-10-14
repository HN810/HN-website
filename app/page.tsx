import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Products } from '@/components/Products'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Products />
      <Projects />
      <Skills />
      <Footer />
    </main>
  )
}
