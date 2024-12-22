import { z } from 'zod';

/**
 * Object as value that shared by `ThemeProvider` context.
 * @typedef {z.infer<typeof themeContextSchema>} themeContextProps
 */
export const themeContextSchema = z.object({
    /** Used theme */
    theme: z.enum(['dark', 'light']),
    /** 
     * Dispatcher to update {@link themeContextProps.theme theme} state that shared by `ThemeProvider` context to toggle theme
     */
    setTheme: z.function().args(z.enum(['dark', 'light'])).returns(z.void()),
    /** Used hue number. Minimum are `0` and maximum are `360` */
    hue: z.number().min(0).max(360),
    /** 
     * Dispatcher to update {@link themeContextProps.hue hue} state that shared by `ThemeProvider` context to toggle hue theme
     */
    changeHue: z.function().args(z.number().min(0).max(360)).returns(z.void()),
})

/**
 * Object as value that shared by `ModalProvider` context.
 * @typedef {z.infer<typeof modalContextSchema>} modalContextProps
 */
export const modalContextSchema = z.object({
    /** Boolean as an state are modal active */
    active: z.boolean(),
    /** 
     * Dispatcher to update {@link modalContextProps.active active} state that shared by `ModalProvider` context to toggle show or hide modal.
     */
    setActive: z.function().args(z.boolean()).returns(z.void()),
    /** Used modal type */
    type: z.enum(['setting']),
    /** 
     * Dispatcher to update {@link modalContextProps.type type} state that shared by `ModalProvider` context to update modal type.
     */
    setType: z.function().args(z.enum(['setting'])).returns(z.void()),
    /** Method to close modal. This will update state internally in provider to close modal */
    handleModalClose: z.function().returns(z.void()),
})