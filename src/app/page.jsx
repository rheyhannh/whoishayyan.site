import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.default}>
      <div>
        <h1>Whoishayyan Home Page.</h1>
        <p>Silahkan pilih menu dibawah :</p>
        <Link href="/pddikti">PDDIKTI</Link>
      </div>
    </main>
  )
}
