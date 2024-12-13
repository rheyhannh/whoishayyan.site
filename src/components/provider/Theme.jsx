'use client'

import { ThemeContextProps } from '@/types/context';
import React, { createContext, useEffect, useState } from 'react'
import isNumeric from 'validator/lib/isNumeric';
import isInt from 'validator/lib/isInt';

export const ThemeContext = createContext(/** @type {ThemeContextProps} */ (null));
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(/** @type {'dark' | 'light'} */ ('light'));
    const [hue, setHue] = useState(/** @type {number} */ (250));

    const changeHue = (val) => {
        setHue(val);
        localStorage.setItem('_hue', val)
        document.documentElement.style.setProperty("--hue-color", val);
        document.documentElement.style.setProperty("--first-color", `hsl(var(--hue-color), 69%, 61%)`);
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('_theme');
        const localHue = localStorage.getItem('_hue');
        if (localTheme === 'dark') {
            setTheme(localTheme);
            document.body.classList.add('dark-theme');
        }
        if (localHue && isNumeric(localHue) && isInt(localHue, { min: 0, max: 359 })) {
            setHue(parseInt(localHue));
            document.documentElement.style.setProperty("--hue-color", localHue);
            document.documentElement.style.setProperty("--first-color", `hsl(var(--hue-color), 69%, 61%)`);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, hue, changeHue }}>
            {children}
        </ThemeContext.Provider>
    )
}