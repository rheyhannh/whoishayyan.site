'use client'

import React, { createContext, useState } from 'react'

export const RootPageContext = createContext(
    /** @type {import('@/schema/page/root').pageProviderProps} */
    (null)
);
export const RootPageProvider = ({ children }) => {
    const [forceLoadingState, setForceLoadingState] = useState(
        /** @type {import('@/schema/page/root').pageProviderProps['forceLoadingState']} */
        (false)
    );
    const [forceErrorState, setForceErrorState] = useState(
        /** @type {import('@/schema/page/root').pageProviderProps['forceErrorState']} */
        (false)
    );

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