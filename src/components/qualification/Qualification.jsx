import QualificationSkeleton from './Skeleton';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import getData from "@/components/_ServerHelper";
import styles from '@/app/_root.module.css'

const QualificationData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function QualificationSection({ initdata }) {
    const [data, setData] = useState(null);
    const [icons, setIcons] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        import('@iconscout/react-unicons').then((Unicons) => {
            setIcons(Unicons);
            setData(initdata && initdata);
            setLoading(false);
            setError(!initdata && true);
        });
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
            const result = await getData();
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
            <h2 onClick={toggleLoading} className={styles.section__title}>Qualification</h2>
            <span onClick={toggleError} className={styles.section__subtitle}>My Personal Journey</span>

            <div className={`${styles.qualification__container} ${styles.container}`}>
                {error && <ErrorFetch clickEvent={clickReload} type={'qualification'} />}
                <div className={styles.qualification__tabs}>
                    {loading && <QualificationSkeleton part={'tabs'} />}
                    {data && icons && !loading && !error &&
                        <QualificationData
                            data={data}
                            unicons={icons}
                            part="tabs"
                            tab={activeTab}
                            tabclick={clickTab}
                        />
                    }
                </div>

                <div className={styles.qualification__sections}>
                    {loading && <QualificationSkeleton part={'content'} />}
                    {data && icons && !loading && !error &&
                        <QualificationData
                            data={data}
                            unicons={icons}
                            part="content"
                            tab={activeTab}
                        />
                    }
                </div>
            </div>
        </section>
    )
}