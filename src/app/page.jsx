import { ThemeProvider } from '@/components/Theme'
import Header from '@/components/Header'
import Sections from '@/components/Sections'
import Footer from '@/components/Footer'
import Scrollup from '@/components/Scrollup'

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <Sections />
      <Footer />
      <Scrollup />
    </ThemeProvider>
  )
}
