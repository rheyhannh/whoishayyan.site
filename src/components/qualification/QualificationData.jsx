'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import QualificationSkeleton from './QualificationSkeleton';
import { FetchData } from '@/components/_ClientHelper';
import ErrorFetch from '@/components/ErrorFetch';
import * as Unicons from '@iconscout/react-unicons';
import styles from '@/app/_root.module.css'

export default function QualificationData({ part }) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => { FetchData('qualification', setData, setIsLoading, setIsError) }, []);

    const handleReload = () => { setIsLoading(true); setIsError(false); setData(null); FetchData('qualification', setData, setIsLoading, setIsError); };

    const changeTab = (event) => {
        if (event.target.classList.contains(styles.qualification__active)) {
            return;
        }
        const tabs = document.querySelectorAll('[tabs]');
        const tabsData = document.querySelectorAll('[tabsdata]');
        const targetTab = event.target;
        const targetData = document.getElementById(event.target.getAttribute('tabs'))
        tabs.forEach(tab => tab.classList.remove(styles.qualification__active));
        tabsData.forEach(tabData => tabData.classList.remove(styles.qualification__active));
        targetTab.classList.add(styles.qualification__active);
        targetData.classList.add(styles.qualification__active);
    }

    if (part === "tabs") {
        return (
            <>
                {isLoading && <QualificationSkeleton part="tabs" />}
                {
                    data && !isLoading && !isError &&
                    <>
                        {data.map((item, index) => {
                            const Icon = Unicons[item.icon];
                            return (
                                <div className={`${styles.qualification__button} ${styles.button__flex} ${index === 0 ? styles.qualification__active : ""}`} tabs={item.title ? item.title.toLowerCase() : item.title} onClick={changeTab} key={crypto.randomUUID()}>
                                    {Icon ? <Icon className={styles.qualification__icon} /> : null}
                                    {item.title}
                                </div>
                            )
                        })}
                    </>
                }
                {isError && <></>}
            </>
        )
    }
    else if (part === "content") {
        return (
            <>
                {
                    isLoading &&
                    <>
                        <div className={styles.qualification__active} tabsdata={'true'}>
                            <QualificationSkeleton part="content" />
                        </div>
                    </>
                }
                {
                    data && !isError && !isLoading &&
                    <>
                        {data.map((item, index) => (
                            <div className={index === 0 ? styles.qualification__active : styles.qualification} tabsdata={'true'} id={item.title ? item.title.toLowerCase() : item.title} key={crypto.randomUUID()}>
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
                    isError &&
                    <>
                        <div className={styles.qualification__active} tabsdata={'true'}>
                            <ErrorFetch clickEvent={handleReload} />
                        </div>
                    </>
                }
            </>
        )
    }


}