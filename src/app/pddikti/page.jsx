import styles from './_pddikti.module.css'
import Link from 'next/link'

export default function Pddikti() {
    return (
        <div className={styles.default}>
            <h1>PDDIKTI Search Page.</h1>
            <p>Cari data mahasiswa, universitas dan lainnya!</p>
            <Link href="/">Back to Home</Link>
        </div>
    )
}