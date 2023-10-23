import Image from "next/image"
import AboutData from "./AboutData"
import styles from '@/app/_root.module.css'

export default function AboutSection() {
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
                    <AboutData/>
                </div>
            </div>
        </section>
    )
}