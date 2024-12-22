import { RootPageProvider } from '@/components/provider/RootPage'
import { ModalProvider } from '@/components/provider/Modal'
import Header from '@/components/Header'
import Sections from '@/components/Sections'
import Footer from '@/components/Footer'
import Scrollup from '@/components/Scrollup'

export default function Home() {
  return (
    <RootPageProvider>
      <ModalProvider>
        <Header />
        <Sections />
        <Footer />
        <Scrollup />
      </ModalProvider>
    </RootPageProvider>
  )
}
