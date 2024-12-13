import { QualificationSection as QualificationSectionData } from '@/types/data/root';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/app/_root.module.css'

export default function QualificationData({ data, part, tab, tabclick }) {
    const [icons, setIcons] = useState(/** @type {JSX.Element} */(null));
    const [tabIcons, setTabIcons] = useState(/** @type {Array<JSX.Element>} */([]));

    const getIcons = async (iconName, className) => {
        const iconsModule = await import('@iconscout/react-unicons');
        if (iconName in iconsModule) {
            const Icon = iconsModule[iconName];

            return (
                <Icon className={className ? styles[className] : ''} />
            );
        } else {
            return null;
        }
    }

    useEffect(() => {
        const loadIcons = async () => {
            const tabIcons = await Promise.all(
                data.map(async (item) => {
                    const icon = await getIcons(item.icon, 'qualification__icon');
                    return icon;
                })
            );
            const icons = await getIcons('UilCalendarAlt');

            setIcons(icons);
            setTabIcons(tabIcons);
        };

        loadIcons();
    }, [data])

    if (part === "tabs") {
        return (
            <>
                {data.map((item, index) => (
                    <div
                        className={`${styles.qualification__button} ${styles.button__flex} ${tab === index ? styles.qualification__active : ""}`}
                        onClick={() => tabclick(index)} key={crypto.randomUUID()}
                    >
                        {tabIcons[index]}
                        {item.title}
                    </div>
                )
                )}
            </>
        )
    }
    else if (part === "content") {
        return (
            <>
                {data.map((item, index) => (
                    <div
                        className={tab === index ? styles.qualification__active : styles.qualification}
                        tabsdata={index}
                        key={crypto.randomUUID()}
                    >
                        {item.data.map((value, index) => (
                            index % 2 === 0 ? (
                                <div className={styles.qualification__data} key={crypto.randomUUID()}>
                                    <div>
                                        <h3 className={styles.qualification__title}>
                                            <Link
                                                href={value.href}
                                                target="_blank"
                                            >
                                                {value.title}
                                            </Link>
                                        </h3>
                                        <span className={styles.qualification__subtitle}>{value.subtitle}</span>
                                        <div className={styles.qualification__calendar}>
                                            {icons}
                                            {value.date}
                                        </div>
                                    </div>
                                    <div>
                                        <span className={styles.qualification__rounder}></span>
                                        <span className={styles.qualification__line}></span>
                                    </div>
                                    <div></div>
                                </div>
                            ) : (
                                <div className={styles.qualification__data} key={crypto.randomUUID()}>
                                    <div></div>

                                    <div>
                                        <span className={styles.qualification__rounder}></span>
                                        <span className={styles.qualification__line}></span>
                                    </div>

                                    <div>
                                        <h3 className={styles.qualification__title}>
                                            <Link
                                                href={value.href}
                                                target="_blank"
                                            >
                                                {value.title}
                                            </Link>
                                        </h3>
                                        <span className={styles.qualification__subtitle}>{value.subtitle}</span>
                                        <div className={styles.qualification__calendar}>
                                            {icons}
                                            {value.date}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ))}
            </>
        )
    }
}