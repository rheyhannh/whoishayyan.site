import ContactSkeleton from "./Skeleton";
import dynamic from "next/dynamic";
import { useState, useEffect, useContext } from 'react';
import { useUpdateEffect } from 'ahooks';
import { RootPageContext } from '@/components/provider/RootPage';
import getRootData from "@/utils/getRootData";
import handleClientError from '@/utils/handleClientError';
import { contactSectionDataSchema } from '@/schema/page/root';
import styles from '@/app/_root.module.css'

const ContactData = dynamic(() => import("./Data"))
const ErrorFetch = dynamic(() => import("@/components/ErrorFetch"))

/**
 * Component that represent section `Contact` on root page
 * @param {{initdata:import('@/schema/page/root').contactSectionDataType}} props ContactSection props
 * @returns {React.ReactElement<{initdata:import('@/schema/page/root').contactSectionDataType}, JSX.IntrinsicElements['section']>} Rendered component
 */
export default function ContactSection({ initdata }) {
    const [data, setData] = useState(
        /** @type {import('@/types/state').SectionState<import('@/schema/page/root').contactSectionDataType>['data']} */
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
                const verifiedData = contactSectionDataSchema.parse(initdata);
                setData(verifiedData);
            } catch (error) {
                handleClientError('Failed load local contact data', error);
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
                const dataJson = JSON.parse(localData)?.contact;
                if (!dataJson) throw new Error('Data not found');

                const verifiedData = contactSectionDataSchema.parse(dataJson);

                setData(verifiedData);
                setLoading(false);
            } catch (error) {
                handleClientError('Failed load local contact data', error);
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
                setData(result.contact);
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