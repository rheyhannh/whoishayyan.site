'use client'

import { useState, useEffect } from 'react';
import AboutSkeleton from './AboutSkeleton';
import { FetchData } from '@/components/_ClientHelper';
import ErrorFetch from '@/components/ErrorFetch';
import Button from '@/components/Button';
import {
    UilDownloadAlt
} from '@iconscout/react-unicons'
import styles from '@/app/_root.module.css'

export default function AboutData({ initdata }) {
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
        FetchData('about', setData, setLoading, setError);
    }

    return (
        <>
            { loading && <AboutSkeleton/> }
            {
                data && !loading && !error &&
                <>
                    <p className={styles.about__description}>
                        {data.description}
                    </p>

                    <div className={styles.about__info}>
                        <div>
                            <span className={styles.about__info_title}>Im interested in</span>
                        </div>
                        <div>
                            <span className={styles.about__info_name} id="interestedText">{data.interestedList[0]}</span>
                        </div>
                    </div>

                    <div className={styles.about__buttons}>
                        <Button
                            href={'/#contact'}
                            className={`${styles.button} ${styles.button__flex}`}
                            text="Download CV"
                            icon={<UilDownloadAlt className={styles.button__icon} />}
                        />
                    </div>
                </>
            }
            { error && <ErrorFetch clickEvent={clickReload}/> }
        </>
    )
}