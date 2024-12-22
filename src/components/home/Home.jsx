import HomeSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import Image from "next/image"
import { useState, useEffect, useContext } from 'react';
import { useUpdateEffect } from 'ahooks';
import { RootPageContext } from '@/components/provider/RootPage';
import getRootData from "@/utils/getRootData";
import handleClientError from '@/utils/handleClientError';
import { homeSectionDataSchema } from '@/schema/page/root';
import styles from '@/app/_root.module.css'
import homePic from '@assets/profil-nobg-min.png'

const HomeData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

/**
 * Component that represent section `Home` on root page
 * @param {{initdata:import('@/schema/page/root').homeSectionDataType}} props HomeSection props
 * @returns {React.ReactElement<{initdata:import('@/schema/page/root').homeSectionDataType}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function HomeSection({ initdata }) {
    const [data, setData] = useState(
        /** @type {import('@/types/state').SectionState<import('@/schema/page/root').homeSectionDataType>['data']} */
        (null)
    );
    const [loading, setLoading] = useState(
        /** @type {import('@/types/state').SectionState['loading']} */
        (true)
    );
    const [error, setError] = useState(
        /** @type {import('@/types/state').SectionState['error']} */
        (false)
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
                const verifiedData = homeSectionDataSchema.parse(initdata);
                setData(verifiedData);
            } catch (error) {
                handleClientError('Failed load local home data', error);
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
                const dataJson = JSON.parse(localData)?.home;
                if (!dataJson) throw new Error('Data not found');

                const verifiedData = homeSectionDataSchema.parse(dataJson);

                setData(verifiedData);
                setLoading(false);
            } catch (error) {
                handleClientError('Failed load local home data', error);
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
                setData(result.home);
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
        <section className={styles.section} id="home">
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
                                    quality={80}
                                    alt={'Home Image'}
                                    className={styles.home__blob_img}
                                    priority={true}
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