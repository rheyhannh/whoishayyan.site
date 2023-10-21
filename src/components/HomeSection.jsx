import Image from "next/image"
import Link from "next/link"
import styles from '../app/_root.module.css'
import {
    UilLinkedin,
    UilGithub,
    UilInstagram,
    UilMessage,
    UilArrowDown,
    UilMouseAlt
} from '@iconscout/react-unicons'

export default function HomeSection() {
    const homeSocials = [
        { href: 'https://www.linkedin.com/in/rheyhannh/', uil: <UilLinkedin/> },
        { href: 'https://github.com/rheyhannh/', uil: <UilGithub/> },
        { href: 'https://www.instagram.com/rheyhannh/', uil: <UilInstagram/> },
    ]

    return (
        <section className={`${styles.home} ${styles.section}`} id="home">
            <div className={`${styles.home__container} ${styles.container} ${styles.grid}`}>
                <div className={`${styles.home__content} ${styles.grid}`}>
                    <div className={styles.home__social}>
                        {homeSocials.map((item, index) => (
                            <div className={styles.social__box} key={crypto.randomUUID()}>
                                    <Link
                                        href={item.href}
                                        className={styles.home__social_icon}
                                        target="_blank"
                                    >
                                        <i>{item.uil}</i>
                                    </Link>
                            </div>
                        ))}
                    </div>

                    <div className={styles.home__img}>
                        <div className={styles.home__blob} id="home__blob">
                            <Image
                                src={'/profil-nobg-min.png'}
                                width={449}
                                height={556}
                                quality={100}
                                alt={'Home Image'}
                                className={styles.home__blob_img}
                                priority={true}
                            />
                        </div>
                    </div>

                    <div className={styles.home__data}>
                        <h1 className={styles.home__title}>Reyhan Naufal <span id="changeFont">Hayyan</span></h1>
                        <h3 className={styles.home__subtitle}><span className={styles.typed__text}></span><span
                                className={`${styles.cursor} ${styles.blink}`}>&nbsp</span></h3>
                        <p className={styles.home__description}>
                            Possess a sharp eye for detail, thrive in collaborative environments, and eagerly
                            embrace new technologies and methodologies.
                        </p>
                        <Link
                            href={'/#contact'}
                            className={`${styles.button} ${styles.button__flex}`}
                        >
                            Contact Me <i className={styles.button__icon}><UilMessage/></i>
                        </Link>
                    </div>
                </div>

                <div className={styles.home__scroll}>
                    <a href="#about" className={`${styles.home__scroll_button} ${styles.button__flex}`}>
                        <i className={styles.home__scroll_mouse}><UilMouseAlt/></i>
                        <span className={styles.home__scroll_name}>Scroll down</span>
                        <i className={styles.home__scroll_arrow}><UilArrowDown/></i>
                    </a>
                </div>
            </div>
    </section>
    )
}