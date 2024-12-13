import { ContactSection as ContactSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import ContactSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from 'react';
import getRootData from "@/utils/getRootData";
import styles from '@/app/_root.module.css'

const ContactData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function ContactSection({ initdata }) {
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
        } else {
            setData(initdata);
            setLoading(false);
        }
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
                const dataJson = JSON.parse(localData).contact;
                if (dataJson) {
                    setData(dataJson);
                    setLoading(false);
                    return;
                }
                throw new Error('Local contact data not found');
            } catch (error) {
                console.error('Failed load local contact data');
                fetchData();
            }
        } else { fetchData() }
    }

    const fetchData = async () => {
        try {
            const result = await getData();
            if (result) {
                setData(result.contact);
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
        <section className={`${styles.contact} ${styles.section}`} id="contact">
            <h2 onClick={toggleLoading} className={styles.section__title}>Contact Me</h2>
            <span onClick={toggleError} className={styles.section__subtitle}>Get In Touch</span>

            <div className={`${styles.contact__container} ${styles.container} ${styles.grid}`}>
                {error && <ErrorFetch clickEvent={clickReload} type={'contact'} />}
                {loading && <ContactSkeleton />}
                {data && !loading && !error &&
                    <ContactData data={data}/>
                }
            </div>
        </section>
    )
}