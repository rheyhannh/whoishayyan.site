import styles from '../page.module.css'
import Link from 'next/link'

export default function Pddikti () {
    return (
        <main className={styles.default}>
            <div>
                <h1>PDDIKTI Search Page.</h1>
                <p>Cari data mahasiswa, universitas dan lainnya!</p>
                <Link href="/">Back to Home</Link>
            </div>
        </main>
    )
}