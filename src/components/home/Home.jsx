import { HomeSection as HomeSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import HomeSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import Image from "next/image"
import { useState, useEffect, useContext } from 'react';
import { RootPageContext } from '../provider/RootPage';
import getRootData from "@/utils/getRootData";
import styles from '@/app/_root.module.css'
import homePic from '../../../public/profil-nobg-min.png'

const HomeData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function HomeSection({ initdata }) {

    const { forceLoadingState, forceErrorState } = useContext(RootPageContext);

    useEffect(() => {
        if (forceLoadingState) setLoading(true);
        else setLoading(false);
    }, [forceLoadingState])

    useEffect(() => {
        if (forceErrorState) setError(true);
        else setError(false);
    }, [forceErrorState])

    useEffect(() => {
        if (!initdata) {
            const timeout = setTimeout(() => {
                setLoading(false);
                setError(true);
            }, 10000);

            return () => clearTimeout(timeout);
        } else {
            setData(initdata);
            setLoading(false);
        }
    }, [initdata])

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
            const result = await getRootData();
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

    return (
        <section className={`${styles.home} ${styles.section}`} id="home">
            <div className={`${styles.container} ${styles.grid}`}>
                <div className={`${styles.home__content} ${styles.grid}`}>
                    {error && <ErrorFetch clickEvent={clickReload} type={'home'} />}

                    <div className={styles.home__social}>
                        {loading && <HomeSkeleton part={'social'} />}
                        {data && !loading && !error && <HomeData data={data} part={'social'} />}
                    </div>

                    <div className={styles.home__img}>
                        {loading && <HomeSkeleton part={'blob'} />}
                        {data && !loading && !error &&
                            <div className={styles.home__blob} id="home__blob">
                                <Image
                                    src={homePic}
                                    quality={100}
                                    alt={'Home Image'}
                                    className={styles.home__blob_img}
                                />
                            </div>
                        }
                    </div>

                    <div className={styles.home__data}>
                        {loading && <HomeSkeleton part={'data'} />}
                        {data && !loading && !error && <HomeData data={data} part={'content'} />}
                    </div>
                </div>
            </div>
        </section>
    )
}