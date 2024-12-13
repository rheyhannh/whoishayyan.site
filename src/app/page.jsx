import { ThemeProvider } from '@/components/provider/Theme'
import { RootPageProvider } from '@/components/provider/RootPage'
import Header from '@/components/Header'
import Sections from '@/components/Sections'
import Footer from '@/components/Footer'
import Scrollup from '@/components/Scrollup'

export default function Home() {
  return (
    <RootPageProvider>
    <ThemeProvider>
      <Header />
      <Sections />
      <Footer />
      <Scrollup />
    </ThemeProvider>
    </RootPageProvider>
  )
}
