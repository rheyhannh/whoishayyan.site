'use client'

import { RootPageContextProps } from '@/types/context';
import React, { createContext, useState } from 'react'

export const RootPageContext = createContext(/** @type {RootPageContextProps} */(null));
export const RootPageProvider = ({ children }) => {
    const [forceLoadingState, setForceLoadingState] = useState(/** @type {boolean} */(false));
    const [forceErrorState, setForceErrorState] = useState(/** @type {boolean} */(false));

    return (
        <RootPageContext.Provider
            value={{
                forceLoadingState, setForceLoadingState,
                forceErrorState, setForceErrorState
            }}
        >
            {children}
        </RootPageContext.Provider>
    )
}