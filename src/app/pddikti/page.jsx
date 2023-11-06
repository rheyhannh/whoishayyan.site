'use client'

import styles from './_pddikti.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Pddikti() {
    const router = useRouter();

    return (
        <div className={styles.default}>
            <h1>PDDIKTI Search Page.</h1>
            <p>Cari data mahasiswa, universitas dan lainnya!</p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: '1rem'
            }}>
                <p onClick={() => { router.back() }}>Back</p>
                <p onClick={() => { router.push('/') }}>Home</p>
                <p onClick={() => { router.forward() }}>Next</p>
                <Link href={'/'}>Link Home</Link>
            </div>
        </div>
    )
}