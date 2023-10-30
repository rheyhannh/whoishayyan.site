import dynamic from "next/dynamic";
import Image from "next/image"
import { useState, useEffect } from 'react';
import getData from "@/components/_ServerHelper";
import Button from "@/components/Button"
import styles from '@/app/_root.module.css'
import {
    UilLinkedin,
    UilGithub,
    UilInstagram
} from '@iconscout/react-unicons'

const HomeSkeleton = dynamic(() => import("./Skeleton"))
const HomeData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function HomeSection({ initdata }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setData(initdata && initdata);
        setError(!initdata && true);
        setLoading(false);
    }, [initdata])

    const toggleLoading = () => {
        setLoading((current) => (current === true ? false : true));
    };

    const toggleError = () => {
        setError((current) => (current === true ? false : true));
    };
     
    const clickReload = () => {
        setLoading(true); setError(false); setData(null);
        const localData = localStorage.getItem('_data');

        if (localData) {
            try {
                const dataJson = JSON.parse(localData).home;
                if (dataJson) { 
                    setData(dataJson);
                    setLoading(false);
                    return;
                }
                throw new Error('Local home data not found');
            } catch (error) {
                console.error('Failed load local home data');
                fetchData();
            }
        } else { fetchData() }
    }

    const fetchData = async () => {
        try {
            const result = await getData();
            if (result) {
                setData(result.home);
                localStorage.setItem(`_data`, JSON.stringify(result))
            }
        } catch (error) {
            console.error("Failed to fetch new data from server");
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const homeSocials = [
        { href: 'https://www.linkedin.com/in/rheyhannh/', uil: <UilLinkedin className={styles.home__social_icon} /> },
        { href: 'https://github.com/rheyhannh/', uil: <UilGithub className={styles.home__social_icon} /> },
        { href: 'https://www.instagram.com/rheyhannh/', uil: <UilInstagram className={styles.home__social_icon} /> },
    ]

    return (
        <section className={`${styles.home} ${styles.section}`} id="home">
            <div className={`${styles.container} ${styles.grid}`}>
                <div className={`${styles.home__content} ${styles.grid}`}>
                    {error && <ErrorFetch clickEvent={clickReload} type={'home'} />}

                    <div className={styles.home__social}>
                        {loading && <HomeSkeleton part={'social'} />}
                        {data && !loading && !error &&
                            homeSocials.map((item, index) => (
                                <div className={styles.social__box} key={crypto.randomUUID()}>
                                    <Button
                                        href={item.href}
                                        target="_blank"
                                        icon={item.uil}
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles.home__img}>
                        {loading && <HomeSkeleton part={'blob'} loadingClick={toggleLoading} />}
                        {data && !loading && !error &&
                            <div onClick={toggleLoading} className={styles.home__blob} id="home__blob">
                                <Image
                                    src={'/profil-nobg-min.png'}
                                    width={449}
                                    height={556}
                                    quality={100}
                                    alt={'Home Image'}
                                    className={styles.home__blob_img}
                                    priority={true}
                                />
                            </div>
                        }
                    </div>

                    <div onClick={toggleError} className={styles.home__data}>
                        {loading && <HomeSkeleton part={'data'} />}
                        {data && !loading && !error && <HomeData data={data} />}
                    </div>
                </div>
            </div>
        </section>
    )
}