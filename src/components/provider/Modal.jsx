'use client'

import { ModalContextProps } from '@/types/context';
import React, { createContext, useState, useEffect } from 'react'
import ModalSetting from '../modal/Setting';

export const ModalContext = createContext(/** @type {ModalContextProps} */(null));
export const ModalProvider = ({ children }) => {
    const [active, setActive] = useState(/** @type {ModalContextProps['active']} */(false));
    const [type, setType] = useState(/** @type {ModalContextProps['type']} */(null));

    const handleModalClose = () => {
        setActive(false);
        setTimeout(() => {
            setType(null);
        }, 350);
    }

    const modalList = {
        setting: <ModalSetting />,
    }

    useEffect(() => {
        if (active) { document.body.classList.add('disable_scroll'); }
        else { document.body.classList.remove('disable_scroll'); }
    }, [active])

    return (
        <ModalContext.Provider
            value={{
                active, setActive,
                type, setType,
                handleModalClose
            }}
        >
            {modalList[type]}
            {children}
        </ModalContext.Provider>
    )
}