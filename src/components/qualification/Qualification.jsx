import QualificationSkeleton from './Skeleton';
import dynamic from 'next/dynamic';
import { useState, useEffect, useContext } from 'react';
import { useUpdateEffect } from 'ahooks';
import { RootPageContext } from '@/components/provider/RootPage';
import getRootData from "@/utils/getRootData";
import handleClientError from '@/utils/handleClientError';
import { qualificationSectionDataSchema } from '@/schema/page/root';
import styles from '@/app/_root.module.css'

const QualificationData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

/**
 * Component that represent section `Qualification` on root page
 * @param {{initdata:import('@/schema/page/root').qualificationSectionDataType}} props QualificationSection props
 * @returns {React.ReactElement<{initdata:import('@/schema/page/root').qualificationSectionDataType}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function QualificationSection({ initdata }) {
    const [data, setData] = useState(
        /** @type {import('@/types/state').SectionState<import('@/schema/page/root').qualificationSectionDataType>['data']} */
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
    const [activeTab, setActiveTab] = useState(0);

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
                const verifiedData = qualificationSectionDataSchema.parse(initdata);
                setData(verifiedData);
            } catch (error) {
                handleClientError('Failed load local qualification data', error);
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
                const dataJson = JSON.parse(localData)?.qualification;
                if (!dataJson) throw new Error('Data not found');

                const verifiedData = qualificationSectionDataSchema.parse(dataJson);

                setData(verifiedData);
                setLoading(false);
            } catch (error) {
                handleClientError('Failed load local qualification data', error);
                fetchData();
            }
        } else {
            fetchData()
        }
    }

    const clickTab = (tabIndex) => {
        setActiveTab(tabIndex);
    }

    const fetchData = async () => {
        try {
            const result = await getRootData();
            if (result) {
                setData(result.qualification);
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
        <section className={`${styles.qualification} ${styles.section}`} id="qualification">
            <h2 className={styles.section__title}>Qualification</h2>
            <span className={styles.section__subtitle}>My Personal Journey</span>

            <div className={`${styles.qualification__container} ${styles.container}`}>
                {error && <ErrorFetch clickEvent={clickReload} type={'qualification'} />}
                <div className={styles.qualification__tabs}>
                    {loading && <QualificationSkeleton part={'tabs'} />}
                    {data && !loading && !error &&
                        <QualificationData
                            data={data}
                            part="tabs"
                            tab={activeTab}
                            tabclick={clickTab}
                        />
                    }
                </div>

                <div className={styles.qualification__sections}>
                    {loading && <QualificationSkeleton part={'content'} />}
                    {data && !loading && !error &&
                        <QualificationData
                            data={data}
                            part="content"
                            tab={activeTab}
                        />
                    }
                </div>
            </div>
        </section>
    )
}