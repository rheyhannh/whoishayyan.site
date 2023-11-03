import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import styles from '@/app/_root.module.css'

export default function AboutData({ data }) {
    const [icons, setIcons] = useState([]);

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
            const icons = await getIcons('UilDownloadAlt', 'button__icon');
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
                />
            </div>
        </>
    )
}