import React from 'react';

/**
 * @typedef {Object} ThemeContextProps 
 * @property {'dark' | 'light'} theme
 * @property {React.Dispatch<React.SetStateAction<ThemeContextProps['theme']>>} setTheme
 * @property {number} hue
 * @property {React.Dispatch<React.SetStateAction<ThemeContextProps['hue']>} changeHue
*/

/**
 * @typedef {Object} RootPageContextProps 
 * @property {boolean} forceLoadingState
 * @property {React.Dispatch<React.SetStateAction<RootPageContextProps['forceLoadingState']>>} setForceLoadingState
 * @property {boolean} forceErrorState
 * @property {React.Dispatch<React.SetStateAction<RootPageContextProps['forceErrorState']>>} setForceErrorState
*/

/**
 * @typedef {Object} ModalContextProps 
 * @property {boolean} active
 * @property {React.Dispatch<React.SetStateAction<ModalContextProps['active']>>} setActive
 * @property {'setting'} type
 * @property {React.Dispatch<React.SetStateAction<ModalContextProps['type']>>} setType
 * @property {() => void} handleModalClose
*/