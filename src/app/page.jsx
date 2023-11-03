import { ThemeProvider } from '@/components/Theme'
import Header from '@/components/Header'
import Sections from '@/components/Sections'
import Footer from '@/components/Footer'
import styles from './_root.module.css'

export default function Home() {
  return (
    <ThemeProvider>
      <Header />
      <main className={styles.main}>
        <Sections />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
