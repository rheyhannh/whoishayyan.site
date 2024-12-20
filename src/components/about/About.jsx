import { AboutSection as AboutSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import AboutSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import Image from "next/image"
import { useState, useEffect, useContext } from 'react';
import { useUpdateEffect } from 'ahooks';
import { RootPageContext } from '../provider/RootPage';
import getRootData from "@/utils/getRootData";
import styles from '@/app/_root.module.css'
import aboutPic from '../../../public/about-min.png'

const AboutData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

/**
 * Component that represent section `About` on root page
 * @param {{initdata:AboutSectionData}} props AboutSection props
 * @returns {React.ReactElement<{initdata:AboutSectionData}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function AboutSection({ initdata }) {
    const [data, setData] = useState(/** @type {SectionState<AboutSectionData>['data']} */(null));
    const [loading, setLoading] = useState(/** @type {SectionState['loading']} */(true));
    const [error, setError] = useState(/** @type {SectionState['error']} */(false));

    const { forceLoadingState, forceErrorState, setForceLoadingState, setForceErrorState } = useContext(RootPageContext);

    useUpdateEffect(() => {
        if (forceLoadingState) setLoading(true);
        else setLoading(false);
    }, [forceLoadingState])

    useUpdateEffect(() => {
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
        if (forceLoadingState || forceErrorState) {
            setForceLoadingState(false);
            setForceErrorState(false);
            return;
        }

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