import Image from "next/image";
import { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ThemeContext } from '@/components/Theme'
import styles from '@/app/_root.module.css';

export default function SkillsData({ data, dataSections }) {
    const [icons, setIcons] = useState([]);
    const [match, setMatch] = useState(window.matchMedia('(min-width: 568px)').matches);
    const [activeBox, setActiveBox] = useState(0);
    const { theme } = useContext(ThemeContext);

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
        const mediaQuery = window.matchMedia('(min-width: 568px)');

        const handleMediaChange = (e) => {
            setMatch(e.matches)
        }

        mediaQuery.addEventListener('change', handleMediaChange);

        const loadIcons = async () => {
            const icons = await Promise.all(
                otherIcons.map(async (item) => {
                    const icon = await getIcons(item.uil, item.className);
                    return icon;
                })
            );

            setIcons(icons);
        };

        loadIcons();

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        }
    }, [])

    const otherIcons = [
        { uil: 'UilAngleLeftB', className: 'swiper_portfolio_icon' },
        { uil: 'UilAngleRightB', className: 'swiper_portfolio_icon' },
    ]

    return (
        <>
            {data.length > 9 ? (
                <Swiper
                    modules={[Navigation, Pagination]}
                    cssMode={true}
                    navigation={{
                        nextEl: `.${styles.skills} .${styles.swiper_button_next}`,
                        prevEl: `.${styles.skills} .${styles.swiper_button_prev}`,
                    }}
                    pagination={{
                        el: ".swiper-pagination",
                        clickable: true,
                    }}
                    style={match ? { width: '100%', order: 1 } : { width: '100%' }}
                >
                    {dataSections.map((section, sectionIndex) => (
                        <SwiperSlide
                            className={`${styles.skills__list} ${styles.swiper}`}
                            key={crypto.randomUUID()}
                        >
                            {section.map((item, index) => (
                                <div
                                    key={crypto.randomUUID()}
                                    className={`${styles.skills__box} ${activeBox === item.no ? styles.active : ''}`}
                                    onClick={() => { setActiveBox(item.no) }}
                                >
                                    <Image
                                        src={theme === 'dark' && item.logoDark ? item.logoDark : item.logo}
                                        width={120}
                                        height={120}
                                        quality={100}
                                        alt={`${item.title} Logo`}
                                        className={styles.skills__img}
                                    />
                                </div>
                            ))}

                            {Array.from({ length: Math.max(0, 9 - section.length) }).map((_, index) => (
                                <div className={`${styles.skills__box} ${styles.empty}`} key={crypto.randomUUID()}></div>
                            ))}
                        </SwiperSlide>
                    ))}

                    <div className={`${styles.skills} ${styles.swiper_button_prev}`}>
                        {icons[0]}
                    </div>

                    <div className={`${styles.skills} ${styles.swiper_button_next}`}>
                        {icons[1]}
                    </div>

                    <div className={`${styles.skills} ${styles.pagination}`}>
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            ) : (
                <div className={`${styles.skills__list}`}>
                    {data.map((item, index) => (
                        <div
                            key={crypto.randomUUID()}
                            className={`${styles.skills__box} ${activeBox === index ? styles.active : ''}`}
                            onClick={() => { setActiveBox(index) }}
                        >
                            <Image
                                src={theme === 'dark' && item.logoDark ? item.logoDark : item.logo}
                                width={120}
                                height={120}
                                quality={100}
                                alt={`${item.title} Logo`}
                                className={styles.skills__img}
                            />
                        </div>
                    ))}
                </div>
            )
            }

            {data.map((item, index) => (
                <div
                    key={crypto.randomUUID()}
                    className={`${styles.skills__about} ${activeBox === index ? styles.active : ''}`}
                >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </>
    )
}