'use client'

import { useState, useEffect } from 'react';
import AboutSkeleton from './AboutSkeleton';
import GetIdentifier from '@/components/_helper';
import ErrorFetch from '@/components/ErrorFetch';
import Button from '@/components/Button';
import {
    UilDownloadAlt
} from '@iconscout/react-unicons'
import styles from '@/app/_root.module.css'

export default function AboutData() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        const type = 'about';
        const uuid = crypto.randomUUID();
        const stamp = Math.floor(Date.now() / 1000).toString();
        const identifier = await GetIdentifier(type, uuid, stamp);

        try {
            if (identifier === -1) { throw new Error(`Something went wrong`) }
            const response = await fetch(`http://localhost:5000/${uuid}?stamp=${stamp}&type=${type}&identifier=${identifier}`, {
                method: "GET",
                cache: "no-cache",
            });
            
            if (!response.ok) { throw new Error(`Failed to fetch data`) }

            const data = await response.json();
            setData(data);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReload = () => {
        setIsLoading(true);
        setIsError(false);
        setData(null);
        fetchData();
    };

    return (
        <>
            { isLoading && <AboutSkeleton/> }
            {
                data && !isLoading && !isError &&
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
            { isError && <ErrorFetch clickEvent={handleReload}/> }
        </>
    )
}