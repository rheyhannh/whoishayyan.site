import { AboutSection as AboutSectionData } from '@/types/data/root';
import { useState, useEffect } from 'react';
import getUniconsIcons from '@/utils/getUniconIcons';
import Button from '@/components/Button';
import styles from '@/app/_root.module.css'

/**
 * Component props for {@link AboutData}
 * @typedef {Object} AboutDataProps
 * @property {AboutSectionData} data
 * Section data
 */

/**
 * Component that represent section `About` on root page with provided data.
 * This will be rendered after refered data fetched in client side.
 * @param {AboutDataProps} props AboutData props
 * @returns {React.ReactElement<AboutDataProps, HTMLDivElement>} Rendered component
 */
export default function AboutData({ data }) {
    const [icons, setIcons] = useState(/** @type {JSX.Element} */(null));

    useEffect(() => {
        const loadIcons = async () => {
            const icons = await getUniconsIcons('UilDownloadAlt', styles.button__icon);
            setIcons(icons);
        };

        loadIcons();
    }, [])

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
                    className={`${styles.button} ${styles.button__flex} ${styles.about__button}`}
                    text="Download CV"
                    icon={icons}
                    label="Download CV"
                />
            </div>
        </>
    )
}