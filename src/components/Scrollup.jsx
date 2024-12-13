'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link'
import { UilArrowUp } from '@iconscout/react-unicons'
import styles from '../app/_root.module.css'

export default function Scrollup() {
    const [scrollUp, setScrollUp] = useState(false);

    const handleScrollUp = () => {
        if (window.scrollY >= 560) { setScrollUp(true) }
        else { setScrollUp(false) }
    }

    useEffect(() => {
        if (window.scrollY >= 560) { setScrollUp(true) }

        window.addEventListener('scroll', handleScrollUp);

        return () => {
            window.removeEventListener('scroll', handleScrollUp);
        }
    }, [])

    return (
        <Link
            href={'#home'}
            className={`${styles.scrollup} ${scrollUp ? styles.show_scroll : ''}`}
            aria-label='Scroll to Top'
        >
            <UilArrowUp className={styles.scrollup_icon} />
        </Link>
    )
}