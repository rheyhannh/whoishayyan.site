import ProjectSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import getData from "@/components/_ServerHelper";
import styles from '@/app/_root.module.css'

const ProjectData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function ProjectSection({ initdata }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!initdata) {
            const timeout = setTimeout(() => {
                setLoading(false);
                setError(true);
            }, 10000);

            return () => clearTimeout(timeout);
        }
        else {
            handleData(initdata);
        }
    }, [initdata])

    const toggleLoading = () => {
        setLoading((current) => (current === true ? false : true));
    };

    const toggleError = () => {
        setError((current) => (current === true ? false : true));
    };

    const handleData = (data) => {
        const content =
            <ProjectData
                data={data}
            />;
        setData(content);
        setLoading(false);
    }

    const clickReload = () => {
        setLoading(true); setError(false); setData(null);
        const localData = localStorage.getItem('_data');

        if (localData) {
            try {
                const dataJson = JSON.parse(localData).project;
                if (dataJson) {
                    handleData(dataJson);
                    return;
                }
                throw new Error('Local project data not found');
            } catch (error) {
                console.error('Failed load local project data');
                fetchData();
            }
        } else { fetchData() }
    }

    const fetchData = async () => {
        try {
            const result = await getData();
            if (result) {
                handleData(result.project);
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
        <section className={`${styles.portfolio} ${styles.section}`} id="project">
            <h2 onClick={toggleLoading} className={styles.section__title}>Project</h2>
            <span onClick={toggleError} className={styles.section__subtitle}>My Application Project</span>
            {error &&
                <>
                    <div className={`${styles.portfolio__container} ${styles.container}`}>
                        <div className={`${styles.portfolio__content} ${styles.grid}`}>
                            <ErrorFetch clickEvent={clickReload} type={'project'} />
                        </div>
                    </div>
                </>
            }
            {loading && <ProjectSkeleton />}
            {data && !loading && !error &&
                data
            }
            <div className={`${styles.portfolio__container} ${styles.container}`}>
                <div className={`${styles.portfolio__content} ${styles.grid}`}>
                </div>
            </div>
        </section>
    )
}