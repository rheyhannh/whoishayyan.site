'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QualificationSkeleton from './QualificationSkeleton';
import { FetchData } from '@/components/_ClientHelper';
import ErrorFetch from '@/components/ErrorFetch';
import * as Unicons from '@iconscout/react-unicons';
import styles from '@/app/_root.module.css'

export default function QualificationData({ initdata, part, tab, tabclick }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(false);
        setData(initdata ? initdata : null);
        setError(initdata ? false : true );
    }, [initdata])

    const clickReload = () => {
        setLoading(true);
        setError(false);
        setData(null);
        FetchData('qualification', setData, setLoading, setError);
    }

    if (part === "tabs") {
        return (
            <>
                {loading && <QualificationSkeleton part="tabs" />}
                {
                    data && !loading && !error &&
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
                }
                {error && <></>}
            </>
        )
    }
    else if (part === "content") {
        return (
            <>
                {
                    loading &&
                    <>
                        <div className={styles.qualification__active} tabsdata={'true'}>
                            <QualificationSkeleton part="content" />
                        </div>
                    </>
                }
                {
                    data && !error && !loading &&
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

                }
                {
                    error &&
                    <>
                        <div className={styles.qualification__active} tabsdata={'true'}>
                            <ErrorFetch clickEvent={clickReload} />
                        </div>
                    </>
                }
            </>
        )
    }


}