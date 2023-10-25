import QualificationData from "./QualificationData"
import styles from '@/app/_root.module.css'

export default function QualificationSection() {
    return (
        <section className={`${styles.qualification} ${styles.section}`} id="qualification">
            <h2 className={styles.section__title}>Qualification</h2>
            <span className={styles.section__subtitle}>My Personal Journey</span>

            <div className={`qualification ${styles.container}`}>
                <div className={styles.qualification__tabs}>
                    <QualificationData part="tabs" />
                </div>

                <div className={styles.qualification__sections}>
                    <QualificationData part="content" />
                </div>
            </div>
        </section>
    )
}