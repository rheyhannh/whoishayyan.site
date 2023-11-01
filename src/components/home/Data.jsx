import Button from '@/components/Button';
import styles from '@/app/_root.module.css'

export default function HomeData({ data, part, unicons }) {
    const getIcons = (iconName, className) => {
        const Icon = unicons[iconName];
        if (!Icon) {
            return null;
        }
        return (
            <Icon className={className ? styles[className] : ''} />
        )
    }

    const homeSocials = [
        { href: 'https://www.linkedin.com/in/rheyhannh/', uil: 'UilLinkedin' },
        { href: 'https://github.com/rheyhannh/', uil: 'UilGithub' },
        { href: 'https://www.instagram.com/rheyhannh/', uil: 'UilInstagram' },
    ]

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
                    icon={getIcons('UilMessage', 'button__icon')}
                />

                <div className={styles.home__scroll}>
                    <a href="#about" className={`${styles.home__scroll_button} ${styles.button__flex}`}>
                        {getIcons('UilMouseAlt', 'home__scroll_mouse')}
                        <span className={styles.home__scroll_name}>Scroll down</span>
                        {getIcons('UilArrowDown', 'home__scroll_arrow')}
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
                            icon={getIcons(item.uil, 'home__social_icon')}
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