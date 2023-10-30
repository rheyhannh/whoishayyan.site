import Button from '@/components/Button';
import {
    UilDownloadAlt
} from '@iconscout/react-unicons'
import styles from '@/app/_root.module.css'

export default function AboutData({ data }) {
    return (
        <>
            <p className={styles.about__description}>
                {data.description}
            </p>

            <div className={styles.about__info}>
                <div>
                    <span className={styles.about__info_title}>Im interested in</span>
                </div>
                <div>
                    <span className={styles.about__info_name} id="interestedText">{data.interestedList[0]}</span>
                </div>
            </div>

            <div className={styles.about__buttons}>
                <Button
                    href={'/#contact'}
                    className={`${styles.button} ${styles.button__flex}`}
                    text="Download CV"
                    icon={<UilDownloadAlt className={styles.button__icon} />}
                />
            </div>
        </>
    )
}