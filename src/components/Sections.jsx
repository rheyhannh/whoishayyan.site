'use client'

import { useState, useEffect } from 'react';
import AboutSection from "./about/AboutSection"
import HomeSection from "./home/HomeSection"
import QualificationSection from "./qualification/QualificationSection"
import { FetchData } from '@/components/_ClientHelper';

export default function Sections() {
    const [data, setData] = useState(null);

    useEffect(() => {
        FetchData(null, setData, null, null);
    }, []);

    return (
        <>
            <HomeSection 
                initdata={data && data.home}
            />
            <AboutSection
                initdata={data && data.about}
            />
            <QualificationSection
                initdata={data && data.qualification}
            />
        </>
    )
}