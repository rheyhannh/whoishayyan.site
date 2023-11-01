'use client'

import { useState, useEffect } from 'react';
import HomeSection from "./home/Home"
import AboutSection from "./about/About"
import QualificationSection from "./qualification/Qualification"
import ProjectSection from './project/Project';
import getData from './_ServerHelper';

export default function Sections() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem('_data');

        const applyLocalData = () => {
            try {
                const dataJson = JSON.parse(localData);
                setData(dataJson);
            } catch (error) {
                console.error('Failed to use local data');
                fetchData();
            }
        }

        const fetchData = async () => {
            try {
                const result = await getData(localData ? localData : null);
                if (result) {
                    setData(result);
                    localStorage.setItem(`_data`, JSON.stringify(result))
                } else {
                    applyLocalData();
                }
            } catch (error) {
                console.error("Failed to fetch new data from server");
            }
        }

        fetchData()
    }, []);

    return (
        <>
            <HomeSection initdata={data && data.home}/>
            <AboutSection initdata={data && data.about} />
            <QualificationSection initdata={data && data.qualification} />
            <ProjectSection initdata={data && data.project} />
        </>
    )
}