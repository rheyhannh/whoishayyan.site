import { AboutSection as AboutSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import AboutSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import Image from "next/image"
import { useState, useEffect, useContext } from 'react';
import { RootPageContext } from '../provider/RootPage';
import getRootData from "@/utils/getRootData";
import styles from '@/app/_root.module.css'
import aboutPic from '../../../public/about-min.png'

const AboutData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function AboutSection({ initdata }) {

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
                const dataJson = JSON.parse(localData).about;
                if (dataJson) {
                    setData(dataJson);
                    setLoading(false);
                    return;
                }
                throw new Error('Local about data not found');
            } catch (error) {
                console.error('Failed load local about data');
                fetchData();
            }
        } else {
            fetchData()
        }
    }

    const fetchData = async () => {
        try {
            const result = await getRootData();
            if (result) {
                setData(result.about);
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
        <section className={`${styles.about} ${styles.section}`} id="about">
            <h2 className={styles.section__title}>About Me</h2>
            <span className={styles.section__subtitle}>My Introduction</span>
            <div className={`${styles.about__container} ${styles.container} ${styles.grid}`}>
                {error && <ErrorFetch clickEvent={clickReload} type={'about'} />}
                {loading && <AboutSkeleton part={'image'} />}
                {data && !loading && !error &&
                    <div className={styles.about__img}>
                        <Image
                            src={aboutPic}
                            quality={100}
                            alt={'About Image'}
                        />
                    </div>
                }

                <div className={styles.about__data}>
                    {loading && <AboutSkeleton part={'data'} />}
                    {data && !loading && !error && <AboutData data={data} />}
                </div>
            </div>
        </section>
    )
}