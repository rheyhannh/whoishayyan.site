import { HomeSection as HomeSectionData } from '@/types/data/root';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import styles from '@/app/_root.module.css'

/**
 * Component props for {@link HomeData}
 * @typedef {Object} HomeDataProps
 * @property {HomeSectionData} data
 * Section data
 * @property {'social' | 'content'} part
 * Render a specific part of component
 */

/**
 * Component that represent section `Home` on root page with provided data.
 * This will be rendered after refered data fetched in client side.
 * @param {HomeDataProps} props HomeData props
 * @returns {React.ReactElement<HomeDataProps, HTMLDivElement>} Rendered component
 */
export default function HomeData({ data, part }) {
    const [icons, setIcons] = useState(/** @type {Array<JSX.Element>} */([]));
    const [socialIcons, setSocialIcons] = useState(/** @type {Array<JSX.Element>} */([]));

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

    const homeSocials = [
        { label: 'Linkedin', href: 'https://www.linkedin.com/in/rheyhannh/', uil: 'UilLinkedin' },
        { label: 'Instagram', href: 'https://github.com/rheyhannh/', uil: 'UilGithub' },
        { label: 'Github', href: 'https://www.instagram.com/rheyhannh/', uil: 'UilInstagram' },
    ]

    const otherIcons = [
        { uil: 'UilMessage', className: 'button__icon' },
        { uil: 'UilMouseAlt', className: 'home__scroll_mouse' },
        { uil: 'UilArrowDown', className: 'home__scroll_arrow' },
    ]

    useEffect(() => {
        const loadIcons = async () => {
            const socialIcons = await Promise.all(
                homeSocials.map(async (item) => {
                    const icon = await getIcons(item.uil, 'home__social_icon');
                    return icon;
                })
            );
            const icons = await Promise.all(
                otherIcons.map(async (item) => {
                    const icon = await getIcons(item.uil, item.className);
                    return icon;
                })
            );
            setIcons(icons);
            setSocialIcons(socialIcons);
        };

        loadIcons();
    }, [homeSocials, otherIcons])

    if (part === "content") {
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
                    className={`${styles.button} ${styles.button__flex} ${styles.home__button}`}
                    text="Contact Me"
                    icon={icons[0]}
                    label="Contact Me"
                />

                <div className={styles.home__scroll}>
                    <a href="#about" className={`${styles.home__scroll_button} ${styles.button__flex}`}>
                        {icons[1]}
                        <span className={styles.home__scroll_name}>Scroll down</span>
                        {icons[2]}
                    </a>
                </div>
            </>
        )
    }
    else if (part === 'social') {
        return (
            <>
                {homeSocials.map((item, index) => (
                    <div className={styles.social__box} key={crypto.randomUUID()}>
                        <Button
                            href={item.href}
                            target="_blank"
                            icon={socialIcons[index]}
                            label={`My ${item.label}`}
                        />
                    </div>
                ))}
            </>
        )
    }
    else {
        return (
            <></>
        )
    }

}