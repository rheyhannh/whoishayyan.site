'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import { ThemeContext } from '@/components/provider/Theme'
import { ModalContext } from '@/components/provider/Modal'
import {
    UilUser,
    UilFileAlt,
    UilConstructor,
    UilBriefcaseAlt,
    UilMessage,
    UilTimes,
    UilMoon,
    UilSun,
    UilApps,
    UilPalette,
    UilCheckCircle,
    UilSetting,
    UilAtom,
} from '@iconscout/react-unicons'
import styles from '../app/_root.module.css'

export default function Header() {
    const { theme, setTheme, hue, changeHue } = useContext(ThemeContext);
    const { active, setActive, setType, handleModalClose } = useContext(ModalContext);
    const [menu, setMenu] = useState(false);
    const [hueMenu, setHueMenu] = useState(false);

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
        document.body.classList.toggle('dark-theme', theme !== 'dark');
        localStorage.setItem('_theme', theme === 'dark' ? 'light' : 'dark')
    };

    const toggleMenu = () => {
        if (hueMenu) { setHueMenu(false) }
        setMenu((current) => (current === true ? false : true));
    }

    const toggleHueMenu = () => {
        if (menu) { setMenu(false) }
        setHueMenu((current) => (current === true ? false : true));
    }

    const toggleSettingModal = () => {
        if (!active) {
            setType('setting');
            setTimeout(() => {
                setActive(true);
            }, 50)
        } else {
            handleModalClose();
        }
    }

    const handleHue = (val) => {
        changeHue(val);
    }

    const navList = [
        { href: '#home', text: 'Home' },
        { href: '#about', text: 'About', uil: <UilUser /> },
        { href: '#qualification', text: 'Qualification', uil: <UilFileAlt /> },
        { href: '#stack', text: 'Stack', uil: <UilBriefcaseAlt /> },
        { href: '#project', text: 'Project', uil: <UilConstructor /> },
        { href: '/components', text: 'Components', uil: <UilAtom /> },
        { href: '#contact', text: 'Contact', uil: <UilMessage /> },
    ]

    const palleteList = [
        { hue: 0 }, { hue: 40 }, { hue: 80 }, { hue: 120 }, { hue: 160 }, { hue: 200 }, { hue: 240 }, { hue: 280 }, { hue: 320 }
    ]

    return (
        <header className={styles.header} id="header">
            <nav className={`${styles.nav} ${styles.container}`} id="header">
                <Link
                    href="#home"
                    className={`${styles.nav__logo} ${styles.active}`}
                    id="logoText"
                >
                    <span>Hayyan</span>
                </Link>

                <div className={`${styles.nav__menu} ${menu ? styles.show_menu : ''}`} id="nav-menu">
                    <ul className={`${styles.nav__list} ${styles.grid}`}>
                        {navList.map((item, index) => (
                            <li key={crypto.randomUUID()} className={styles.nav__item}>
                                <Link
                                    href={item.href}
                                    className={`${styles.nav__link} ${index === 0 ? styles.active_link : ''}`}
                                >
                                    <i className={index === 0 ? '' : styles.nav__icon}>{item.uil}</i>
                                    <span>{item.text}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <i className={styles.nav__close} onClick={toggleMenu} id="nav-close"><UilTimes /></i>
                </div>

                <div className={`${styles.nav__menu_hue} ${hueMenu ? styles.show_menu : ''}`}>
                    <p style={{
                        margin: '0 0 1.25rem 0',
                        textAlign: 'center',
                        fontWeight: 'var(--font-semi-bold)'
                    }}>Select Color Theme</p>
                    <div className={`${styles.nav__list_hue} ${styles.grid}`}>
                        {palleteList.map((item, index) => (
                            <div
                                className={`${styles.nav__hue} ${hue === item.hue ? styles.active : ''}`}
                                hue={item.hue}
                                style={{ background: `hsl(${item.hue}, 69%, 61%)` }}
                                key={crypto.randomUUID()}
                                onClick={() => { handleHue(item.hue) }}
                            >
                                {hue === item.hue ? <UilCheckCircle /> : ''}
                            </div>
                        ))}
                    </div>

                    <i className={styles.nav__close} onClick={toggleHueMenu} id="nav-close"><UilTimes /></i>
                </div>

                <div className={styles.nav__slider}>
                    <input
                        className={styles.color_range}
                        style={{
                            color: `hsl(${hue}, 69%, 61%)`
                        }}
                        value={`${hue}`}
                        onChange={(e) => {
                            handleHue(e.target.valueAsNumber);
                        }}
                        type="range"
                        min="0"
                        max="359"
                        name='colorrange'
                        id='colorrange'
                    />
                </div>

                <div className={styles.nav__btns}>
                    <i className={styles.config} onClick={toggleSettingModal}>
                        <UilSetting />
                    </i>

                    <i className={styles.change_theme} onClick={toggleTheme}>
                        {theme === "dark" ? <UilSun /> : <UilMoon />}
                    </i>

                    <i className={`${styles.change_theme} ${styles.hue}`} onClick={toggleHueMenu}>
                        <UilPalette />
                    </i>

                    <div className={styles.nav__toggle} onClick={toggleMenu} id="nav-toggle">
                        <i><UilApps /></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}