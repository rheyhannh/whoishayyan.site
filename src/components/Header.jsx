'use client'

import { useContext, useState, useEffect, useRef } from 'react'
import { useClickAway } from 'ahooks'
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

const palleteList = [
    { hue: 0 }, { hue: 40 }, { hue: 80 }, { hue: 120 }, { hue: 160 }, { hue: 200 }, { hue: 240 }, { hue: 280 }, { hue: 320 }
]

const navList = [
    { href: '#home', text: 'Home' },
    { href: '#about', text: 'About', uil: <UilUser /> },
    { href: '#qualification', text: 'Qualification', uil: <UilFileAlt /> },
    { href: '#stack', text: 'Stack', uil: <UilBriefcaseAlt /> },
    { href: '#project', text: 'Project', uil: <UilConstructor /> },
    { href: '/components', text: 'Components', uil: <UilAtom /> },
    { href: '#contact', text: 'Contact', uil: <UilMessage /> },
]

export default function Header() {
    const { theme, setTheme, hue, changeHue } = useContext(ThemeContext);
    const { active, setActive, setType, handleModalClose } = useContext(ModalContext);
    const [menu, setMenu] = useState(false);
    const [hueMenu, setHueMenu] = useState(false);
    const [matchQuery, setMatchQuery] = useState(false);

    const menuBtn = useRef(null);
    const hueMenuBtn = useRef(null);

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

    const handleMediaQueryChange = (e) => {
        setMatchQuery(e.matches);
        setMenu(false);
        setHueMenu(false);
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');

        setMatchQuery(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        }
    }, [])

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

                <NavMenu menu={menu} toggleMenu={toggleMenu} matchQuery={matchQuery} menuBtn={menuBtn} />

                <HueMenu hue={hue} hueMenu={hueMenu} toggleHueMenu={toggleHueMenu} handleHue={handleHue} hueMenuBtn={hueMenuBtn} />

                <div className={styles.nav__slider}>
                    <input
                        className={styles.color_range}
                        style={{
                            color: `hsl(${hue}, 69%, 61%)`
                        }}
                        value={`${hue}`}
                        onChange={(e) => { handleHue(e.target.valueAsNumber) }}
                        onClick={(e) => { e.target.blur() }}
                        type="range"
                        min="0"
                        max="360"
                        step="6"
                        name='colorrange'
                        id='colorrange'
                    />
                </div>

                <div className={styles.nav__btns}>
                    <i
                        tabIndex={'0'}
                        className={styles.config}
                        onClick={toggleSettingModal}
                        onKeyDown={(e) => { if (e.key === 'Enter') toggleSettingModal(); }}
                    >
                        <UilSetting />
                    </i>

                    <i
                        tabIndex={'0'}
                        className={styles.change_theme}
                        onClick={toggleTheme}
                        onKeyDown={(e) => { if (e.key === 'Enter') toggleTheme(); }}
                    >
                        {theme === "dark" ? <UilSun /> : <UilMoon />}
                    </i>

                    <i
                        ref={hueMenuBtn}
                        tabIndex={'0'}
                        className={`${styles.change_theme} ${styles.hue}`}
                        onClick={toggleHueMenu}
                        onKeyDown={(e) => { if (e.key === 'Enter') toggleHueMenu(); }}
                    >
                        <UilPalette />
                    </i>

                    <div
                        ref={menuBtn}
                        tabIndex={'0'}
                        className={styles.nav__toggle}
                        onClick={toggleMenu}
                        onKeyDown={(e) => { if (e.key === 'Enter') toggleMenu(); }}
                        id="nav-toggle"
                    >
                        <i><UilApps /></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}

function NavMenu({ menu, toggleMenu, matchQuery, menuBtn }) {
    const navMenuRef = useRef(
        /** @type {HTMLDivElement} */
        (null)
    );

    useEffect(() => {
        if (menu && navMenuRef.current) navMenuRef.current.focus();
    }, [menu])

    useClickAway(() => {
        if (menu) toggleMenu();
    }, [navMenuRef, menuBtn])

    return (
        <div
            ref={navMenuRef}
            tabIndex={menu ? '0' : '-1'}
            className={`${styles.nav__menu} ${menu ? styles.show_menu : ''}`}
            onKeyDown={(e) => { if (e.key === 'Escape' && menu) toggleMenu(); }}
            id="nav-menu"
        >
            <ul className={`${styles.nav__list} ${styles.grid}`}>
                {navList.map((item, index) => (
                    <li key={index} className={styles.nav__item}>
                        <Link
                            tabIndex={matchQuery ? '0' : menu ? '0' : '-1'}
                            href={item.href}
                            className={`${styles.nav__link} ${index === 0 ? styles.active_link : ''}`}
                        >
                            <i className={index === 0 ? '' : styles.nav__icon}>{item.uil}</i>
                            <span>{item.text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <i
                tabIndex={menu ? '0' : '-1'}
                className={styles.nav__close}
                onClick={toggleMenu}
                onKeyDown={(e) => { if (e.key === 'Enter') toggleMenu(); }}
                id="nav-close"
            >
                <UilTimes />
            </i>
        </div>
    )
}

function HueMenu({ hue, hueMenu, toggleHueMenu, handleHue, hueMenuBtn }) {
    const hueMenuRef = useRef(
        /** @type {HTMLDivElement} */
        (null)
    )

    useEffect(() => {
        if (hueMenu && hueMenuRef.current) hueMenuRef.current.focus();
    }, [hueMenu])

    useClickAway(() => {
        if (hueMenu) toggleHueMenu();
    }, [hueMenuRef, hueMenuBtn])

    return (
        <div
            ref={hueMenuRef}
            tabIndex={hueMenu ? '0' : '-1'}
            className={`${styles.nav__menu_hue} ${hueMenu ? styles.show_menu : ''}`}
            onKeyDown={(e) => { if (e.key === 'Escape' && hueMenu) toggleHueMenu(); }}
        >
            <p style={{ margin: '0 0 1.25rem 0', textAlign: 'center', fontWeight: 'var(--font-semi-bold)' }}>
                Select Color Theme
            </p>
            <div className={`${styles.nav__list_hue} ${styles.grid}`}>
                {palleteList.map((item, index) => (
                    <div
                        key={index}
                        tabIndex={hueMenu ? '0' : '-1'}
                        className={`${styles.nav__hue} ${hue === item.hue ? styles.active : ''}`}
                        hue={item.hue}
                        style={{ background: `hsl(${item.hue}, 69%, 61%)` }}
                        onClick={() => { handleHue(item.hue) }}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleHue(item.hue); }}
                    >
                        {hue === item.hue ? <UilCheckCircle /> : ''}
                    </div>
                ))}
            </div>

            <i
                tabIndex={hueMenu ? '0' : '-1'}
                className={styles.nav__close}
                onClick={toggleHueMenu}
                onKeyDown={(e) => { if (e.key === 'Enter') toggleHueMenu(); }}
                id="nav-close"
            >
                <UilTimes />
            </i>
        </div>
    )
}