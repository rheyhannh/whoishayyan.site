'use client'

import { createContext, useEffect, useState } from 'react'
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const localTheme = localStorage.getItem('_theme');
        if (localTheme === 'dark') {
            setTheme(localTheme);
            document.body.classList.add('dark-theme');
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}