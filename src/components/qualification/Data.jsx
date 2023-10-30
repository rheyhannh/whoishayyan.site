import Link from 'next/link';
import * as Unicons from '@iconscout/react-unicons';
import styles from '@/app/_root.module.css'

export default function QualificationData({ data, part, tab, tabclick }) {
    if (part === "tabs") {
        return (
            <>
                {data.map((item, index) => {
                    const Icon = Unicons[item.icon];
                    return (
                        <div
                            className={`${styles.qualification__button} ${styles.button__flex} ${tab === index ? styles.qualification__active : ""}`}
                            onClick={() => tabclick(index)} key={crypto.randomUUID()}
                        >
                            {Icon ? <Icon className={styles.qualification__icon} /> : null}
                            {item.title}
                        </div>
                    )
                })}
            </>
        )
    }
    else if (part === "content") {
        return (
            <>
                {data.map((item, index) => (
                    <div
                        className={tab === index ? styles.qualification__active : styles.qualification}
                        tabsdata={index}
                        key={crypto.randomUUID()}
                    >
                        {item.data.map((value, index) => (
                            index % 2 === 0 ? (
                                <div className={styles.qualification__data} key={crypto.randomUUID()}>
                                    <div>
                                        <h3 className={styles.qualification__title}>
                                            <Link
                                                href={value.href}
                                                target="_blank"
                                            >
                                                {value.title}
                                            </Link>
                                        </h3>
                                        <span className={styles.qualification__subtitle}>{value.subtitle}</span>
                                        <div className={styles.qualification__calendar}>
                                            <Unicons.UilCalendarAlt />
                                            {value.date}
                                        </div>
                                    </div>
                                    <div>
                                        <span className={styles.qualification__rounder}></span>
                                        <span className={styles.qualification__line}></span>
                                    </div>
                                    <div></div>
                                </div>
                            ) : (
                                <div className={styles.qualification__data} key={crypto.randomUUID()}>
                                    <div></div>

                                    <div>
                                        <span className={styles.qualification__rounder}></span>
                                        <span className={styles.qualification__line}></span>
                                    </div>

                                    <div>
                                        <h3 className={styles.qualification__title}>
                                            <Link
                                                href={value.href}
                                                target="_blank"
                                            >
                                                {value.title}
                                            </Link>
                                        </h3>
                                        <span className={styles.qualification__subtitle}>{value.subtitle}</span>
                                        <div className={styles.qualification__calendar}>
                                            <Unicons.UilCalendarAlt />
                                            {value.date}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ))}
            </>
        )
    }
}