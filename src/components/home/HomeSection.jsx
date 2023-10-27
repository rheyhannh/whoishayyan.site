import Image from "next/image"
import HomeData from "./HomeData"
import Button from "@/components/Button"
import styles from '@/app/_root.module.css'
import {
    UilLinkedin,
    UilGithub,
    UilInstagram
} from '@iconscout/react-unicons'

export default function HomeSection({ initdata }) {
    const homeSocials = [
        { href: 'https://www.linkedin.com/in/rheyhannh/', uil: <UilLinkedin className={styles.home__social_icon} /> },
        { href: 'https://github.com/rheyhannh/', uil: <UilGithub className={styles.home__social_icon} /> },
        { href: 'https://www.instagram.com/rheyhannh/', uil: <UilInstagram className={styles.home__social_icon} /> },
    ]

    return (
        <section className={`${styles.home} ${styles.section}`} id="home">
            <div className={`${styles.container} ${styles.grid}`}>
                <div className={`${styles.home__content} ${styles.grid}`}>
                    <div className={styles.home__social}>
                        {homeSocials.map((item, index) => (
                            <div className={styles.social__box} key={crypto.randomUUID()}>
                                <Button
                                    href={item.href}
                                    target="_blank"
                                    icon={item.uil}
                                />
                            </div>
                        ))}
                    </div>

                    <div className={styles.home__img}>
                        <div className={styles.home__blob} id="home__blob">
                            <Image
                                src={'/profil-nobg-min.png'}
                                width={449}
                                height={556}
                                quality={100}
                                alt={'Home Image'}
                                className={styles.home__blob_img}
                                priority={true}
                            />
                        </div>
                    </div>

                    <div className={styles.home__data}>
                        <HomeData initdata={initdata} />
                    </div>
                </div>
            </div>
        </section>
    )
}