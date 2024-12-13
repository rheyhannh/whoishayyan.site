import { ContactSection as ContactSectionData } from '@/types/data/root';
import { SectionState } from '@/types/state';
import ContactSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from 'react';
import { RootPageContext } from '../provider/RootPage';
import getRootData from "@/utils/getRootData";
import styles from '@/app/_root.module.css'

const ContactData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

export default function ContactSection({ initdata }) {
    const [data, setData] = useState(/** @type {SectionState<ContactSectionData>['data']} */(null));
    const [loading, setLoading] = useState(/** @type {SectionState['loading']} */(true));
    const [error, setError] = useState(/** @type {SectionState['error']} */(false));

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
        } else {
            setData(initdata);
            setLoading(false);
        }
    }, [initdata])

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
            const result = await getRootData();
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
            <h2 className={styles.section__title}>Contact Me</h2>
            <span className={styles.section__subtitle}>Get In Touch</span>

            <div className={`${styles.contact__container} ${styles.container} ${styles.grid}`}>
                {error && <ErrorFetch clickEvent={clickReload} type={'contact'} />}
                {loading && <ContactSkeleton />}
                {data && !loading && !error &&
                    <ContactData data={data} />
                }
            </div>
        </section>
    )
}