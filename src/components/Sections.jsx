'use client'

import { useState, useEffect } from 'react';
import handleClientError from '@/utils/handleClientError';
import HomeSection from "./home/Home";
import AboutSection from "./about/About";
import QualificationSection from "./qualification/Qualification";
import SkillsSection from './skills/Skills';
import ProjectSection from './project/Project';
import ContactSection from './contact/Contact';
import getRootData from '../utils/getRootData';
import styles from '@/app/_root.module.css';

export default function Sections() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem('_data');

        const applyLocalData = () => {
            try {
                const dataJson = JSON.parse(localData);
                setData(dataJson);

            } catch (error) {
                handleClientError('Failed to use local data', error)
            }
        }

        const fetchData = async () => {
            try {
                const result = await getRootData();
                setData(result);
                localStorage.setItem(`_data`, JSON.stringify(result))
            } catch (error) {
                handleClientError('Failed to fetch new data from server', error)
                applyLocalData();
            }
        }

        fetchData();
    }, []);

    return (
        <main className={styles.main}>
            <HomeSection initdata={data && data.home} />
            <AboutSection initdata={data && data.about} />
            <QualificationSection initdata={data && data.qualification} />
            <SkillsSection initdata={data && data.skills} />
            <ProjectSection initdata={data && data.project} />
            <ContactSection initdata={data && data.contact} />
        </main>
    )
}