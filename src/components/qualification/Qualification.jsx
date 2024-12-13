import { QualificationSection as QualificationSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import QualificationSkeleton from './Skeleton';
import dynamic from 'next/dynamic';
import { useState, useEffect, useContext } from 'react';
import { RootPageContext } from '../provider/RootPage';
import getRootData from "@/utils/getRootData";
import styles from '@/app/_root.module.css'

const QualificationData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

/**
 * Component that represent section `Qualification` on root page
 * @param {{initdata:QualificationSectionData}} props QualificationSection props
 * @returns {React.ReactElement<{initdata:QualificationSectionData}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function QualificationSection({ initdata }) {
    const [data, setData] = useState(/** @type {SectionState<QualificationSectionData>['data']} */(null));
    const [loading, setLoading] = useState(/** @type {SectionState['loading']} */(true));
    const [error, setError] = useState(/** @type {SectionState['error']} */(false));
    const [activeTab, setActiveTab] = useState(0);

    const { forceLoadingState, forceErrorState, setForceLoadingState, setForceErrorState } = useContext(RootPageContext);

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
        if (forceLoadingState || forceErrorState) {
            setForceLoadingState(false);
            setForceErrorState(false);
            return;
        }
        
        setLoading(true); setError(false); setData(null);
        const localData = localStorage.getItem('_data');

        if (localData) {
            try {
                const dataJson = JSON.parse(localData).qualification;
                if (dataJson) {
                    setData(dataJson);
                    setLoading(false);
                    return;
                }
                throw new Error('Local qualification data not found');
            } catch (error) {
                console.error('Failed load local qualification data');
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
            console.error("Failed to fetch new data from server");
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