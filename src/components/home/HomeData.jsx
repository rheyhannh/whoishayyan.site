'use client'

import { useState, useEffect } from 'react';
import HomeSkeleton from './HomeSkeleton';
import { FetchData } from '@/components/_ClientHelper';
import ErrorFetch from '@/components/ErrorFetch';
import Button from '@/components/Button';
import {
    UilMessage,
    UilMouseAlt,
    UilArrowDown
} from '@iconscout/react-unicons'
import styles from '@/app/_root.module.css'

export default function HomeData() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => { FetchData('home', setData, setIsLoading, setIsError) }, []);

    const handleReload = () => { setIsLoading(true); setIsError(false); setData(null); FetchData('home', setData, setIsLoading, setIsError); };

    return (
        <>  
            { isLoading && <HomeSkeleton/> }
            {
                data && !isLoading && !isError &&
                <> 
                    <h1 className={styles.home__title}>
                        {data.title}
                    </h1>

                    <h3 className={styles.home__subtitle}>
                        <span className={styles.typed__text}>{data.subtitle}</span>
                        <span className={`${styles.cursor} ${styles.blink}`}></span>
                    </h3>

                    <p className={styles.home__description}>
                        {data.description}
                    </p>

                    <Button 
                        href="/#contact" 
                        className={`${styles.button} ${styles.button__flex}`}
                        text="Contact Me" 
                        icon={<UilMessage className={styles.button__icon}/>}
                    />
                    
                    <div className={styles.home__scroll}>
                        <a href="#about" className={`${styles.home__scroll_button} ${styles.button__flex}`}>
                            <UilMouseAlt className={styles.home__scroll_mouse}/>
                            <span className={styles.home__scroll_name}>Scroll down</span>
                            <UilArrowDown className={styles.home__scroll_arrow}/>
                        </a>
                    </div>                
                </>
            }
            { isError && <ErrorFetch clickEvent={handleReload}/> }
        </>
    )
}