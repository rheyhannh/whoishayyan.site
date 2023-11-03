import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from '@/app/_root.module.css';
import Button from '@/components/Button';

export default function ProjectData({ data, swiper }) {
    const [icons, setIcons] = useState([]);
    const [projectIcons, setProjectIcons] = useState([]);
    
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
            const projectIcons = await Promise.all(
                data.map(async (item) => {
                    const icon = await getIcons(item.button.iconName, item.button.iconClass);
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
            setProjectIcons(projectIcons)
        };

        loadIcons();
    }, [data])

    const otherIcons = [
        { uil: 'UilAngleLeftB', className: 'swiper_portfolio_icon' },
        { uil: 'UilAngleRightB', className: 'swiper_portfolio_icon' },
    ]

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                loop={data.length > 2 ? true : false}
                cssMode={true}
                navigation={{
                    nextEl: `.${styles.swiper_button_next}`,
                    prevEl: `.${styles.swiper_button_prev}`,
                }}
                pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                }}
                className={`${styles.portfolio__container} ${styles.container}`}
                onSwiper={() => { swiper(true) }}
            >
                {data.map((item, index) => (
                    <>
                        <SwiperSlide
                            className={`${styles.portfolio__content} ${styles.grid}`}
                            key={crypto.randomUUID()}
                        >
                            <Image
                                src={item.image.src}
                                width={300}
                                height={200}
                                quality={100}
                                alt={item.image.alt}
                                className={styles.portfolio__img}
                            />
                            <div className={styles.portfolio__data}>
                                <h3 className={styles.portfolio__title}>{item.title}</h3>
                                <p className={`${styles.portfolio__description} ${styles.text__justify}`} >
                                    {item.description}
                                </p>
                                <Button
                                    href={item.button.href}
                                    target={item.button.newTab ? '_blank' : '_self'}
                                    className={`${styles.button} ${styles.button__flex} ${styles.button__small} ${styles.portfolio__button}`}
                                    text={item.button.text}
                                    icon={projectIcons[index]}
                                />
                            </div>
                        </SwiperSlide>
                    </>
                ))}

                {data.length > 1 &&
                    <>
                        <div className={styles.swiper_button_prev}>
                            {icons[0]}
                        </div>
                        <div className={styles.swiper_button_next}>
                            {icons[1]}
                        </div>

                        <div className={`${styles.portfolio} ${styles.pagination}`}>
                            <div className="swiper-pagination"></div>
                        </div>
                    </>
                }
            </Swiper>
        </>
    )
}