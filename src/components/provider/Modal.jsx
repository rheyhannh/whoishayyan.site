'use client'

import { ModalContextProps } from '@/types/context';
import React, { createContext, useState } from 'react'
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