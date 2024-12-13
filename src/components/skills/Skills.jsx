import { SkillSection as SkillSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import SkillsSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { useEffect, useState, useContext } from "react";
import { RootPageContext } from '../provider/RootPage';
import getRootData from "@/utils/getRootData";
import styles from '@/app/_root.module.css'

const SkillsData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export const itemsPerSwiper = 9;

export default function SkillsSection({ initdata }) {

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
        }
        else {
            if (initdata.length > 9) {
                handleData(initdata, getDataSections(initdata));
            } else {
                handleData(initdata, null);
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
        setLoading(true); setError(false); setData(null);
        const localData = localStorage.getItem('_data');

        if (localData) {
            try {
                const dataJson = JSON.parse(localData).skills;
                if (dataJson) {
                    handleData(dataJson, getDataSections(dataJson));
                    return;
                }
                throw new Error('Local skills data not found');
            } catch (error) {
                console.error('Failed load local skills data');
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
            console.error("Failed to fetch new data from server");
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