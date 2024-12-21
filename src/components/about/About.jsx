import AboutSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import Image from "next/image"
import { useState, useEffect, useContext } from 'react';
import { useUpdateEffect } from 'ahooks';
import { RootPageContext } from '@/components/provider/RootPage';
import getRootData from "@/utils/getRootData";
import handleClientError from '@/utils/handleClientError';
import { aboutSectionDataSchema } from '@/schema/page/root';
import styles from '@/app/_root.module.css'
import aboutPic from '@assets/about-min.png'

const AboutData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

/**
 * Component that represent section `About` on root page
 * @param {{initdata:import('@/schema/page/root').aboutSectionDataType}} props AboutSection props
 * @returns {React.ReactElement<{initdata:import('@/schema/page/root').aboutSectionDataType}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function AboutSection({ initdata }) {
    const [data, setData] = useState(
        /** @type {import('@/types/state').SectionState<import('@/schema/page/root').aboutSectionDataType>['data']} */
        (null)
    );
    const [loading, setLoading] = useState(
        /** @type {import('@/types/state').SectionState['loading']} */(true)
    );
    const [error, setError] = useState(
        /** @type {import('@/types/state').SectionState['error']} */(false)
    );

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
            try {
                const verifiedData = aboutSectionDataSchema.parse(initdata);
                setData(verifiedData);
            } catch (error) {
                handleClientError('Failed load local about data', error);
                setError(true);
            } finally {
                setLoading(false);
            }
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
                const dataJson = JSON.parse(localData)?.about;
                if (!dataJson) throw new Error('Data not found');

                const verifiedData = aboutSectionDataSchema.parse(dataJson);

                setData(verifiedData);
                setLoading(false);
            } catch (error) {
                handleClientError('Failed load local about data', error);
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
            handleClientError('Failed to fetch new data from server', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={styles.section} id="about">
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