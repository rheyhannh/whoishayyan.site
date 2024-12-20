import { SkillSection as SkillSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import SkillsSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { useEffect, useState, useContext } from "react";
import { useUpdateEffect } from 'ahooks';
import { RootPageContext } from '@/components/provider/RootPage';
import getRootData from "@/utils/getRootData";
import handleClientError from '@/utils/handleClientError';
import { skillSectionDataSchema } from '@/schema/page/root';
import styles from '@/app/_root.module.css'

const SkillsData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export const itemsPerSwiper = 9;

/**
 * Component that represent section `Skills` on root page
 * @param {{initdata:SkillSectionData}} props SkillsSection props
 * @returns {React.ReactElement<{initdata:SkillSectionData}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function SkillsSection({ initdata }) {
    const [data, setData] = useState(/** @type {SectionState<SkillSectionData>['data']} */(null));
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
                const verifiedData = skillSectionDataSchema.parse(initdata);
                if (verifiedData.length > 9) {
                    handleData(verifiedData, getDataSections(verifiedData));
                } else {
                    handleData(verifiedData, null);
                }
            } catch (error) {
                handleClientError('Failed load local skills data', error);
                setError(true);
            }
        }
    }, [initdata])

    const getDataSections = (data) => {
        const swiperSections = [];
        const numberedSkillsData = data.map((skill, index) => ({
            ...skill,
            no: index,
        }));

        for (let i = 0; i < data.length; i += itemsPerSwiper) {
            const section = numberedSkillsData.slice(i, i + itemsPerSwiper);
            swiperSections.push(section);
        }

        return swiperSections
    }

    const handleData = (data, dataSections) => {
        const content =
            <SkillsData
                data={data}
                dataSections={dataSections ? dataSections : null}
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
                const dataJson = JSON.parse(localData)?.skills;
                if (!dataJson) throw new Error('Data not found');

                const verifiedData = skillSectionDataSchema.parse(dataJson);
            
                handleData(verifiedData, getDataSections(verifiedData));
            } catch (error) {
                handleClientError('Failed load local skills data', error);
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
                handleData(result.skills, getDataSections(result.skills));
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
        <section className={`${styles.skills} ${styles.section}`} id="stack">
            <h2 className={styles.section__title}>Stack</h2>
            <span className={styles.section__subtitle}>My Development Stack</span>
            <div className={`${styles.skills__container} ${styles.container} ${styles.grid}`}>
                {error && <ErrorFetch clickEvent={clickReload} type={'skills'} />}
                {loading && <SkillsSkeleton />}
                {data && !loading && !error &&
                    data
                }
            </div>
        </section>
    )
}