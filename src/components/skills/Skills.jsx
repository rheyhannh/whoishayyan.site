import SkillsSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import getData from "@/components/_ServerHelper";
import styles from '@/app/_root.module.css'

const SkillsData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function SkillsSection({ initdata }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [activeBox, setActiveBox] = useState(0);
    const [swiperSections, setSwiperSections] = useState([]);
    const [swiperReady, setSwiperReady] = useState(false);

    useEffect(() => {
        setData(initdata && initdata);
        setLoading(swiperReady ? false : true);
        setError(!initdata && true);
        if (initdata && initdata.length > 9) {
            const swiperSections = [];
            const numberedSkillsData = initdata.map((skill, index) => ({
                ...skill,
                no: index,
            }));
            const itemsPerSwiper = 9;
        
            for (let i = 0; i < initdata.length; i += itemsPerSwiper) {
                const section = numberedSkillsData.slice(i, i + itemsPerSwiper);
                swiperSections.push(section);
            }

            setSwiperSections(swiperSections)
        }
    }, [initdata, swiperReady])

    const toggleLoading = () => {
        setLoading((current) => (current === true ? false : true));
        setData((current) => (current ? null : initdata));
    };

    const toggleError = () => {
        setError((current) => (current === true ? false : true));
    };

    const clickReload = () => {
        setLoading(true); setError(false); setData(null);
        const localData = localStorage.getItem('_data');

        if (localData) {
            try {
                const dataJson = JSON.parse(localData).skills;
                if (dataJson) {
                    setData(dataJson);
                    setLoading(false);
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
            const result = await getData();
            if (result) {
                setData(result.skills);
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
        <section className={`${styles.skills} ${styles.section}`} id="skills">
            <h2 onClick={toggleLoading} className={styles.section__title}>Stack</h2>
            <span onClick={toggleError} className={styles.section__subtitle}>My Development Stack</span>
            <div className={`${styles.skills__container} ${styles.container} ${styles.grid}`}>
                {error && <ErrorFetch clickEvent={clickReload} type={'skills'} />}
                {loading && <SkillsSkeleton />}
                {data && !error &&
                    <SkillsData
                        data={data}
                        swiper={setSwiperReady}
                        swiperSections={swiperSections}
                        box={activeBox}
                        boxClick={setActiveBox}
                    />
                }
            </div>
        </section>
    )
}