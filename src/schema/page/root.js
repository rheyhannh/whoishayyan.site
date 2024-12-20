import { z } from 'zod';

/**
 * Object as data used on root page section `About`.
 * @typedef {z.infer<typeof aboutSectionDataSchema>} aboutSectionDataType
 */
export const aboutSectionDataSchema = z.object({
    /** Section description */
    description: z.string(),
    /** Array as a interested list */
    interestedList: z.array(z.string()),
});

/**
 * Object as data used on root page section `Contact`.
 * @typedef {z.infer<typeof contactSectionDataSchema>} contactSectionDataType
 */
export const contactSectionDataSchema = z.object({
    /** Array that describe an content. This will render icon with title and description */
    content: z.array(
        z.object({
            /** 
             * Unicons icon name that exist in `react/unicons`
             * - Ex: `UilPhone`
            */
            uil: z.string(),
            /** Content title */
            title: z.string(),
            /** Content description */
            text: z.string(),
            /** Used classname */
            className: z.string(),
        }),
    ),
    /** Object that describe button as call to action and rendered as anchor element */
    button: z.object({
        /** Button text */
        text: z.string(),
    }),
});

/**
 * Object as data used on root page section `Home`.
 * @typedef {z.infer<typeof homeSectionDataSchema>} homeSectionDataType
 */
export const homeSectionDataSchema = z.object({
    /** Section title */
    title: z.string(),
    /** Section subtitle */
    subtitle: z.string(),
    /** Section description */
    description: z.string(),
});

/**
 * Array as data used on root page section `Project`.
 * Each entries describe on going or acomplished projects.
 * @typedef {z.infer<typeof projectSectionDataSchema>} projectSectionDataType
 */
export const projectSectionDataSchema = z.array(
    z.object({
        /** Object containing source and alt for project image */
        image: z.object({
            /** 
             * Project source image
             * - Ex : `/portfolio1.jpg`
            */
            src: z.string(),
            /** Project alt image */
            alt: z.string(),
        }),
        /** Project title */
        title: z.string(),
        /** Project description */
        description: z.string(),
        /** Object that describe button as call to action in current project item and rendered as anchor element */
        button: z.object({
            /** Target that can be URL or element id that exist in current page */
            href: z.string(),
            /** When truthy will set target attribute `_blank` */
            newTab: z.boolean(),
            /** Button text */
            text: z.string(),
        }),
    }),
);

/**
 * Array as data used on root page section `Qualification`.
 * Each entries describe an tab data, where each tab data contain some contents on `data` props.
 * @typedef {z.infer<typeof qualificationSectionDataSchema>} qualificationSectionDataType
 */
export const qualificationSectionDataSchema = z.array(
    z.object({
        /** Tab title */
        title: z.string(),
        /** 
         * Tab icon that an Unicons icon name that exist in `react/unicons`
         * - Ex: `UilPhone`
        */
        icon: z.string(),
        /** Tab contents */
        data: z.array(
            z.object({
                /** Content title */
                title: z.string(),
                /** Content target URL */
                href: z.string(),
                /** Content description */
                subtitle: z.string(),
                /** 
                 * Content date 
                 * - Ex : `2015 - 2018`
                */
                date: z.string(),
            })
        ),
    }),
);

/**
 * Array as data used on root page section `Skills`.
 * Each entries describe skills or tools that are mastered. 
 * @typedef {z.infer<typeof skillSectionDataSchema>} skillSectionDataType
 */
export const skillSectionDataSchema = z.array(
    z.object({
        /** Item id that will react `key` used, so make sure each entries value are unique */
        no: z.number(),
        /** 
         * Item logo image source 
         * - Ex : `/logo/axios.png`
        */
        logo: z.string(),
        /** 
         * Item logo image source while in dark mode, use `null` when not exist
         * - Ex : `/logo/axios.png`
        */
        logoDark: z.string().nullable(),
        /** Item title */
        title: z.string(),
        /** Item description */
        description: z.string(),
    }),
);

/**
 * Object as data used on all section of root page .
 * @typedef {z.infer<typeof allSectionDataSchema>} allSectionDataType
 */
export const allSectionDataSchema = z.object({
    /** Home section data */
    home: homeSectionDataSchema,
    /** About section data */
    about: aboutSectionDataSchema,
    /** Qualification section data */
    qualification: qualificationSectionDataSchema,
    /** Skills section data */
    skills: skillSectionDataSchema,
    /** Project section data */
    project: projectSectionDataSchema,
    /** Contact section data */
    contact: contactSectionDataSchema,
})

/**
 * Object as value that shared by `RootPageProvider` context.
 * @typedef {z.infer<typeof pageContextSchema>} pageProviderProps
 */
export const pageContextSchema = z.object({
    /** Force each section in root page use `loading` state */
    forceLoadingState: z.boolean(),
    /** Dispatcher to update {@link pageProviderProps.forceLoadingState forceLoadingState} state that shared by `RootPageProvider` context */
    setForceLoadingState: z.function().args(z.boolean()).returns(z.void()),    /** Force each section in root page use `loading` state */
    /** Force each section in root page use `error` state */
    forceErrorState: z.boolean(),
    /** Dispatcher to update {@link pageProviderProps.forceErrorState forceErrorState} state that shared by `RootPageProvider` context */
    setForceErrorState: z.function().args(z.boolean()).returns(z.void()),
})