'use client'

import { useState, useEffect } from 'react';
import HomeSkeleton from './HomeSkeleton';
import GetIdentifier from '@/components/_helper';
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

    const fetchData = async () => {
        const type = 'home';
        const uuid = crypto.randomUUID();
        const stamp = Math.floor(Date.now() / 1000).toString();
        const identifier = await GetIdentifier(type, uuid, stamp);

        try {   
            if (identifier === -1) { throw new Error(`Something went wrong`) }
            const response = await fetch(`http://localhost:5000/${uuid}?stamp=${stamp}&type=${type}&identifier=${identifier}`, {
                method: "GET",
                cache: "no-cache",
            });

            if (!response.ok) { throw new Error(`Failed to fetch data`)  }

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