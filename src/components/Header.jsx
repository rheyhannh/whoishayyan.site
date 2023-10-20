import Link from 'next/link'
import styles from '../app/main.module.css'
import { 
    UilUser, 
    UilBookAlt, 
    UilFileAlt, 
    UilConstructor, 
    UilBriefcaseAlt, 
    UilMessage,
    UilTimes,
    UilMoon,
    UilApps
} from '@iconscout/react-unicons'

export default function Header() {
    const navList = [
        {href: '/#home', text: 'Home'},
        {href: '/#about', text: 'About', uil: <UilUser/>},
        {href: '/#qualification', text: 'Qualification', uil: <UilBookAlt/>},
        {href: '/#skills', text: 'Skills', uil: <UilFileAlt/>},
        {href: '/#portfolio', text: 'Project', uil: <UilConstructor/>},
        {href: '/#services', text: 'Contributions', uil: <UilBriefcaseAlt/>},
        {href: '/#contact', text: 'Contact', uil: <UilMessage/>},
    ]

    return (
        <header className={styles.header} id="header">
        
            <nav className={`${styles.nav} ${styles.container}`} id="header">
                <a href="#" className={`${styles.nav__logo} ${styles.active}`} id="logoText">
                    <span>Hayyan</span>
                </a>

                <div className={styles.nav__menu} id="nav-menu">
                    <ul className={`${styles.nav__list} ${styles.grid}`}>
                        {navList.map((item, index) => (
                            <li key={index} className={styles.nav__item}>
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
                    <i className={styles.nav__close} id="nav-close"><UilTimes/></i>
                </div>

                <div className={styles.nav__slider}>
                    <input className={styles.color_range} type="range" min="0" max="359"/>
                </div>

                <div className={styles.nav__btns}>
                    <i className={styles.change_theme} id="theme-button"><UilMoon/></i>
                    <div className={styles.nav__toggle} id="nav-toggle">
                        <i><UilApps/></i>
                    </div>
                </div>
            </nav>
        </header>   
    )
}