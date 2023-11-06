import Link from 'next/link'
import styles from '../app/_root.module.css'
import {
    UilInstagram,
    UilTwitterAlt,
    UilFacebookF
} from '@iconscout/react-unicons'

export default function Footer() {
    const footerLinks = [
        { href: '#qualification', text: 'Qualification' },
        { href: '#project', text: 'Project' },
        { href: '#contact', text: 'Contact' },
    ]

    const footerSocials = [
        { href: 'https://www.facebook.com/rheyhannh/', uil: <UilFacebookF/> },
        { href: 'https://www.instagram.com/rheyhannh/', uil: <UilInstagram/> },
        { href: 'https://twitter.com/rheyhannh', uil: <UilTwitterAlt/> },
    ]

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__bg}>
                <div className={`${styles.footer__container} ${styles.container} ${styles.grid}`}>
                    <div>
                        <h1 className={styles.footer__title}>Hayyan</h1>
                        <span className={styles.footer__subtitle}>Website Developer Enthusiast</span>
                    </div>

                    <ul className={styles.footer__links}>
                        {footerLinks.map((item, index) => (
                            <li key={crypto.randomUUID()}>
                                <Link
                                    href={item.href}
                                    className={styles.footer__link}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.footer__socials}>
                        {footerSocials.map((item, index) => (
                            <Link
                                key={crypto.randomUUID()}
                                href={item.href}
                                className={styles.footer__social}
                                target="_blank"
                            >
                                <i>{item.uil}</i>
                            </Link>
                        ))}
                    </div>
                </div>
                <p className={styles.footer__copy}>&#169; Hayyan. All right reserved</p>
            </div>
        </footer>
    )
}