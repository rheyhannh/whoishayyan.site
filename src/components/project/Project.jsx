import { ProjectSection as ProjectSectionData } from '@/types/data/root';
import { ProjectDataProps } from './Data'
import { SectionState } from '@/types/state';
import ProjectSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useContext } from 'react';
import { useUpdateEffect } from 'ahooks';
import { RootPageContext } from '../provider/RootPage';
import getRootData from "@/utils/getRootData";
import handleClientError from '@/utils/handleClientError';
import { projectSectionDataSchema } from '@/schema/page/root';
import styles from '@/app/_root.module.css'

const ProjectData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

/**
 * Component that represent section `Project` on root page
 * @param {{initdata:ProjectSectionData}} props ProjectSection props
 * @returns {React.ReactElement<{initdata:ProjectSectionData}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function ProjectSection({ initdata }) {
    const [data, setData] = useState(/** @type {React.ReactElement<ProjectDataProps, HTMLDivElement>} */(null));
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
        }
        else {
            try {
                const verifiedData = projectSectionDataSchema.parse(initdata);
                handleData(verifiedData);
            } catch (error) {
                handleClientError('Failed load local project data', error);
                setError(true);
            }
        }
    }, [initdata])

    const handleData = (data) => {
        const content =
            <ProjectData
                data={data}
            />;
        setData(content);
        setLoading(false);
    }


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
                const dataJson = JSON.parse(localData)?.project;
                if (!dataJson) throw new Error('Data not found');

                const verifiedData = projectSectionDataSchema.parse(dataJson);

                handleData(verifiedData);
            } catch (error) {
                handleClientError('Failed load local project data', error);
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
                handleData(result.project);
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
        <section className={`${styles.portfolio} ${styles.section}`} id="project">
            <h2 className={styles.section__title}>Project</h2>
            <span className={styles.section__subtitle}>My Application Project</span>
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