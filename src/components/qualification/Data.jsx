import { useEffect, useState } from 'react';
import getUniconsIcons from '@/utils/getUniconIcons';
import Link from 'next/link';
import styles from '@/app/_root.module.css'

/**
 * Component props for {@link QualificationData}
 * @typedef {Object} QualificationDataProps
 * @property {import('@/schema/page/root').qualificationSectionDataType} data
 * Section data
 * @property {'tabs' | 'content'} part
 * Render a specific part of component
 * @property {number} tab
 * Active tab index
 * @property {(x:number) => void} tabclick
 * Tab click handler, this will update state on parent
 */

/**
 * Component that represent section `Qualification` on root page with provided data.
 * This will be rendered after refered data fetched in client side.
 * @param {QualificationDataProps} props QualificationData props
 * @returns {React.ReactElement<QualificationDataProps, HTMLDivElement>} Rendered component
 */
export default function QualificationData({ data, part, tab, tabclick }) {
    const [icons, setIcons] = useState(/** @type {JSX.Element} */(null));
    const [tabIcons, setTabIcons] = useState(/** @type {Array<JSX.Element>} */([]));

    useEffect(() => {
        const loadIcons = async () => {
            const tabIcons = await Promise.all(
                data.map(async (item) => {
                    const icon = await getUniconsIcons(item.icon, styles.qualification__icon);
                    return icon;
                })
            );
            const icons = await getUniconsIcons('UilCalendarAlt');

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
                        key={index}
                        tabIndex={'0'}
                        className={`${styles.qualification__button} ${styles.button__flex} ${tab === index ? styles.qualification__active : ""}`}
                        onClick={() => tabclick(index)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { tabclick(index) } }}
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
                        key={index}
                    >
                        {item.data.map((value, index) => (
                            index % 2 === 0 ? (
                                <div className={styles.qualification__data} key={index}>
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
                                <div className={styles.qualification__data} key={index}>
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