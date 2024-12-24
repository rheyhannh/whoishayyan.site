import { z } from 'zod';

/**
 * Object as data used on root page section `About`.
 * @typedef {z.infer<typeof aboutSectionDataSchema>} aboutSectionDataType
 */
export const aboutSectionDataSchema = z.object({
    /** 
     * Section description 
     * @required
     */
    description: z.string(),
    /** 
     * Array as a interested list 
     * @required To keep layout, atleast 1 entries
     */
    interestedList: z.array(z.string()),
});

/**
 * Object as data used on root page section `Contact`.
 * @typedef {z.infer<typeof contactSectionDataSchema>} contactSectionDataType
 */
export const contactSectionDataSchema = z.object({
    /** 
     * Array that describe an content. This will render icon with title and description 
     * @required To keep layout, atleast 1 content
     */
    content: z.array(
        z.object({
            /** 
             * Content icon that an Unicons icon name that exist in `react/unicons`
             * - Ex: `UilPhone`
             * 
             * @required
            */
            uil: z.string(),
            /** 
             * Content title 
             * @required
             */
            title: z.string(),
            /** 
             * Content description 
             * @required
             */
            text: z.string(),
            /** 
             * Used icon classname.
             * This props are `nullish` so when null or undefined means not using icon classname.
             * 
             * @optional
             */
            className: z.string().nullish(),
        }),
    ),
    /** Object that describe button as call to action and rendered as anchor element */
    button: z.object({
        /** 
         * Button text 
         * @required
         */
        text: z.string(),
    }),
});

/**
 * Object as data used on root page section `Home`.
 * @typedef {z.infer<typeof homeSectionDataSchema>} homeSectionDataType
 */
export const homeSectionDataSchema = z.object({
    /** 
     * Section title 
     * @required
     */
    title: z.string(),
    /** 
     * Section subtitle 
     * @required
     */
    subtitle: z.string(),
    /** 
     * Section description 
     * @required
     */
    description: z.string(),
    /**
     * Link contents that can be an social media or anything
     * @required To keep layout, atleast 1 entries. Recommended are 3 - 5 entries.
     */
    links: z.array(z.object({
        /**
         * Item label or accessibility name
         * @default 'My Link'
        */
        label: z.string().default('My Link'),
        /**
         * Item url
         * - Ex : `'https://github.com/'`
         * @required
        */
        href: z.string(),
        /**
         * Button icon that an Unicons icon name that exist in `react/unicons`. 
         * - Ex: `UilGithub`
         * 
         * @required
         */
        uil: z.string(),
    })),
});

/**
 * Array as data used on root page section `Project`.
 * Each entries describe on going or acomplished projects.
 * @typedef {z.infer<typeof projectSectionDataSchema>} projectSectionDataType
 */
export const projectSectionDataSchema = z.array(
    z.object({
        /** 
         * Object containing source and alt for project image 
         * @required
         */
        image: z.object({
            /** 
             * Project source image
             * - Ex : `/portfolio1.jpg`
             * 
             * @required
            */
            src: z.string(),
            /** 
             * Project alt image 
             * @required
             */
            alt: z.string(),
        }),
        /** 
         * Project title 
         * @required
         */
        title: z.string(),
        /** 
         * Project description 
         * @required
         * */
        description: z.string(),
        /** 
         * Object that describe button as call to action in current project item and rendered as anchor element 
         * @required
         */
        button: z.object({
            /** 
             * Target that can be URL or element id that exist in current page 
             * @required
             */
            href: z.string(),
            /** 
             * When truthy will set target attribute `_blank` to open link in new tab. 
             * @default false
             */
            newTab: z.boolean().default(false),
            /** 
             * Button text 
             * @required
             */
            text: z.string(),
            /** 
             * Button icon that an Unicons icon name that exist in `react/unicons`. 
             * - Ex: `UilPhone`
             * 
             * This props are `nullish` so when null or undefined means not using icon.
             * @optional
            */
            iconName: z.string().nullish(),
            /** 
             * Button icon classname. This props are `nullish` so when null or undefined means not using icon classname.
             * @optional
            */
            iconClass: z.string().nullish(),
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
        /** 
         * Tab title 
         * @required
         */
        title: z.string(),
        /** 
         * Tab icon that an Unicons icon name that exist in `react/unicons`
         * - Ex: `UilPhone`
         * 
         * This props are `nullish` so when null or undefined means not using icon.
         * @optional
        */
        icon: z.string().nullish(),
        /** 
         * Tab contents 
         * @required To keep layout, atleast 1 entries
         */
        data: z.array(
            z.object({
                /** 
                 * Content title 
                 * @required
                 */
                title: z.string(),
                /** 
                 * Content target URL 
                 * @required
                 */
                href: z.string(),
                /** 
                 * Content description 
                 * @required
                 */
                subtitle: z.string(),
                /** 
                 * Content date 
                 * - Ex : `2015 - 2018`
                 * 
                 * @required
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
        /** 
         * Item id and should unique. Simple ways are leave this props as undefined, will generate random for it.
         * @default Math.floor(Math.random() * 10000) + 1
         */
        no: z.number().default(Math.floor(Math.random() * 10000) + 1),
        /** 
         * Item logo image source 
         * - Ex : `/logo/axios.png`
         * 
         * @required
        */
        logo: z.string(),
        /** 
         * Item logo image source in dark mode.
         * This props are `nullable` when not exist make sure use null.
         * - Ex : `/logo/axios.png`
         * 
         * @required
        */
        logoDark: z.string().nullable(),
        /** 
         * Item tags 
         * @required Atleast 1 entries
         */
        tags: z.array(z.string()),
        /** Item url
         * - Ex : `'https://react.dev/'`
         * 
         * This props are `nullish` so when null or undefined means will rendered as plain text not anchor.
         * @optional
         */
        url: z.string(),
        /** 
         * Item title 
         * @required
         */
        title: z.string(),
        /** 
         * Item description 
         * @required
         */
        description: z.string(),
    }),
);

/**
 * Object as data used on all section of root page .
 * @typedef {z.infer<typeof allSectionDataSchema>} allSectionDataType
 */
export const allSectionDataSchema = z.object({
    /** 
     * Home section data 
     * @required
     */
    home: homeSectionDataSchema,
    /** 
     * About section data 
     * @required
     */
    about: aboutSectionDataSchema,
    /** 
     * Qualification section data 
     * @required
     */
    qualification: qualificationSectionDataSchema,
    /** 
     * Skills section data 
     * @required
     */
    skills: skillSectionDataSchema,
    /** 
     * Project section data
     * @required
     */
    project: projectSectionDataSchema,
    /** 
     * Contact section data 
     * @required
     */
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