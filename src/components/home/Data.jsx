import Button from '@/components/Button';
import {
    UilMessage,
    UilMouseAlt,
    UilArrowDown
} from '@iconscout/react-unicons'
import styles from '@/app/_root.module.css'

export default function HomeData({ data }) {
    return (
        <>
            <h1 className={styles.home__title}>
                {data.title}
            </h1>

            <h3 className={styles.home__subtitle}>
                <span className={styles.typed__text}>{data.subtitle}</span>
                <span className={`${styles.cursor} ${styles.blink}`}></span>
            </h3>

            <p className={styles.home__description}>
                {data.description}
            </p>

            <Button
                href="/#contact"
                className={`${styles.button} ${styles.button__flex}`}
                text="Contact Me"
                icon={<UilMessage className={styles.button__icon} />}
            />

            <div className={styles.home__scroll}>
                <a href="#about" className={`${styles.home__scroll_button} ${styles.button__flex}`}>
                    <UilMouseAlt className={styles.home__scroll_mouse} />
                    <span className={styles.home__scroll_name}>Scroll down</span>
                    <UilArrowDown className={styles.home__scroll_arrow} />
                </a>
            </div>
        </>
    )
}