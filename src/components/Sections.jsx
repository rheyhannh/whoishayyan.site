'use client'

import React, { useEffect } from 'react';
import HomeSection from "./home/Home";
import AboutSection from "./about/About";
import QualificationSection from "./qualification/Qualification";
import SkillsSection from './skills/Skills';
import ProjectSection from './project/Project';
import ContactSection from './contact/Contact';
import styles from '@/app/_root.module.css';

/**
 * Render each section in root page and wrapped with main element
 * @param {Omit<React.HTMLProps<React.JSX.IntrinsicElements['main']>, 'className'> & {data:import('@/schema/page/root').allSectionDataType}} props Sections props
 * @returns {React.ReactElement<Omit<React.HTMLProps<React.JSX.IntrinsicElements['main']>, 'className'>, React.JSX.IntrinsicElements['main']>} Rendered component
 */
export default function Sections({ data, ...props }) {
    useEffect(() => {
        if (data) localStorage.setItem('_data', JSON.stringify(data));
    }, [data])

    return (
        <main className={styles.main} {...props}>
            <HomeSection initdata={data && data.home} />
            <AboutSection initdata={data && data.about} />
            <QualificationSection initdata={data && data.qualification} />
            <SkillsSection initdata={data && data.skills} />
            <ProjectSection initdata={data && data.project} />
            <ContactSection initdata={data && data.contact} />
        </main>
    )
}