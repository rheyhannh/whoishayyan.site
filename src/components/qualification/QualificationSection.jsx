import { useState } from 'react';
import QualificationData from "./QualificationData"
import styles from '@/app/_root.module.css'

export default function QualificationSection({ initdata }) {
    const [activeTab, setActiveTab] = useState(0);

    const clickTab = (tabIndex) => {
        setActiveTab(tabIndex);
    }

    return (
        <section className={`${styles.qualification} ${styles.section}`} id="qualification">
            <h2 className={styles.section__title}>Qualification</h2>
            <span className={styles.section__subtitle}>My Personal Journey</span>

            <div className={`qualification ${styles.container}`}>
                <div className={styles.qualification__tabs}>
                    <QualificationData 
                        initdata={initdata}
                        part="tabs"
                        tab={activeTab}
                        tabclick={clickTab} 
                    />
                </div>

                <div className={styles.qualification__sections}>
                    <QualificationData
                        initdata={initdata} 
                        part="content"
                        tab={activeTab} 
                    />
                </div>
            </div>
        </section>
    )
}