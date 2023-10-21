import Image from "next/image"
import Link from "next/link"
import styles from '../app/_root.module.css'
import {
    UilDownloadAlt
} from '@iconscout/react-unicons'

export default function AboutSection() {
    const insterestedList = 
    [
        'Blockchain', 
        'Cryptocurrencies', 
        'Website Development', 
        'Bitcoin', 
        'Internet of Things'
    ];

    return (
        <section className={`${styles.about} ${styles.section}`} id="about">
        <h2 className={styles.section__title}>About Me</h2>
        <span className={styles.section__subtitle}>My Introduction</span>
        
        <div className={`${styles.about__container} ${styles.container} ${styles.grid}`}>
            <div className={styles.about__img}>
                <Image
                    src={'/about-min.png'}
                    width={512}
                    height={341}
                    quality={100}
                    alt={'About Image'}
                    priority={true}
                />
            </div>

            <div className={styles.about__data}>
                <p className={styles.about__description}>
                    I am a final-year Computer Engineering student at the University of Brawijaya. I have a
                    strong foundation in building web servers using Node.js and a solid understanding of HTML,
                    CSS, and JavaScript.
                </p>
                <div className={styles.about__info}>
                    <div>
                        <span className={styles.about__info_title}>I'm interested in</span>
                    </div>
                    <div>
                        <span className={styles.about__info_name} id="interestedText">Internet of Things</span>
                    </div>
                </div>

                <div className={styles.about__buttons}>
                <Link
                    download={''}
                    href={'/#contact'}
                    className={`${styles.button} ${styles.button__flex}`}
                >
                    Download CV<i className={styles.button__icon}><UilDownloadAlt/></i>
                </Link>
                </div>
            </div>
        </div>
    </section>
    )
}