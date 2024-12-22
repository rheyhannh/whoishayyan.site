import { RootPageProvider } from '@/components/provider/RootPage'
import { ModalProvider } from '@/components/provider/Modal'
import Header from '@/components/Header'
import Sections from '@/components/Sections'
import Footer from '@/components/Footer'
import Scrollup from '@/components/Scrollup'
import styles from '@/app/_root.module.css'

export default function Home() {
  return (
    <RootPageProvider>
      <ModalProvider>
        <Base>
          <Header />
          <Sections />
          <Footer />
          <Scrollup />
        </Base>
      </ModalProvider>
    </RootPageProvider>
  )
}

function Base({ children }) {
  return (
    <div className={styles.base}>
      {children}
    </div>
  )
}
