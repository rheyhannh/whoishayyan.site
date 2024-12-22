import Image from "next/image";
import { useState, useEffect, useContext } from 'react';
import getUniconsIcons from '@/utils/getUniconIcons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ThemeContext } from '@/components/provider/Theme';
import { itemsPerSwiper } from './Skills';
import styles from '@/app/_root.module.css';

const otherIcons = [
    { uil: 'UilAngleLeftB', className: 'swiper_portfolio_icon' },
    { uil: 'UilAngleRightB', className: 'swiper_portfolio_icon' },
]

/**
 * Component props for {@link SkillsData}
 * @typedef {Object} SkillsDataProps
 * @property {import('@/schema/page/root').skillSectionDataType} data
 * Section data
 * @property {Array<import('@/schema/page/root').skillSectionDataType>} dataSections
 * Array containing paginated {@link SkillsDataProps.data section data}
 * 
 * ```js
 * const offset = 9;
 * const data = [] // Assume this array has length 12
 * const dataSection = [[], []] // Paginated data 
 * 
 * console.log(dataSection[0].length) // 9
 * console.log(dataSection[1].length) // 3
 * ```
 * 
 * See {@link itemsPerSwiper} what offset we use here.
 * 
 */

/**
 * Component that represent section `Skills` on root page with provided data.
 * This will be rendered after refered data fetched in client side.
 * @param {SkillsDataProps} props SkillsData props
 * @returns {React.ReactElement<SkillsDataProps, HTMLDivElement>} Rendered component
 */
export default function SkillsData({ data, dataSections }) {
    const [icons, setIcons] = useState(/** @type {Array<JSX.Element>} */([]));
    const [match, setMatch] = useState(window.matchMedia('(min-width: 568px)').matches);
    const [activeBox, setActiveBox] = useState(0);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 568px)');

        const handleMediaChange = (e) => {
            setMatch(e.matches)
        }

        mediaQuery.addEventListener('change', handleMediaChange);

        const loadIcons = async () => {
            const icons = await Promise.all(
                otherIcons.map(async (item) => {
                    const icon = await getUniconsIcons(item.uil, item?.className ? styles[item.className] : null);
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
                            key={sectionIndex}
                            className={`${styles.skills__list} ${styles.swiper}`}
                        >
                            {({ isActive }) => (
                                <>
                                    {section.map((item, index) => (
                                        <div
                                            key={index}
                                            tabIndex={isActive ? '0' : '-1'}
                                            className={`${styles.skills__box} ${activeBox === item.no ? styles.active : ''}`}
                                            onClick={() => setActiveBox(item.no)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') setActiveBox(item.no);
                                            }}
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
                                        <div
                                            key={index}
                                            className={`${styles.skills__box} ${styles.empty}`}
                                        />
                                    ))}
                                </>
                            )}
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
                            key={index}
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
                    key={index}
                    className={`${styles.skills__about} ${activeBox === index ? styles.active : ''}`}
                >
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </>
    )
}