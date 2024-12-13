/**
 * @typedef {Object} AboutSection 
 * @property {string} description
 * Section description
 * @property {Array<string>} interestedList
 * Array as a interested list
*/

/**
 * @typedef {Object} ContactItemProps 
 * @property {string} uil
 * Icon name
 * - Ex: `UilPhone`
 * @property {string} title
 * Contact item title
 * @property {string} text
 * Contact item content text
 * @property {string} className
 * Used classname
*/

/**
 * @typedef {Object} ContactSection 
 * @property {Array<ContactItemProps>} content
 * @property {Object} button
 * @property {string} button.text
 * Button content text
*/

/**
 * @typedef {Object} HomeSection 
 * @property {string} title
 * Section title
 * @property {string} subtitle
 * Section subtitle
 * @property {string} description
 * Section description

*/

/**
 * @typedef {Object} ProjectItemProps 
 * @property {Object} image
 * Object containing source and alt for used image
 * @property {string} image.src
 * Source image
 * - Ex : `/portfolio1.jpg`
 * @property {string} image.alt
 * Alt image
 * @property {string} title
 * Project item title
 * @property {string} description
 * Project item description
 * @property {Object} button
 * Button as a call to action
 * @property {string} button.href
 * Button href
 * @property {boolean} button.newTab
 * Are button open an new tab
 * @property {string} button.text
 * Button content text
*/

/**
 * @typedef {Array<ProjectItemProps>} ProjectSection
*/

/**
 * @typedef {Object} QualificationItemProps 
 * @property {string} title
 * Qualification item title
 * @property {string} href
 * Qualification item href
 * @property {string} subtitle
 * Qualification item subtitle
 * @property {string} date
 * Qualification item date
 * - Ex : `2015 - 2018`
*/

/**
 * @typedef {Object} QualificationTabProps 
 * @property {string} title
 * Qualification tab title
 * @property {string} icon
 * Icon name
 * - Ex: `UilPhone`
 * @property {Array<QualificationItemProps>} data
 * An array contain items in refered tab
*/

/**
 * @typedef {Array<QualificationTabProps>} QualificationSection
*/

/**
 * @typedef {Object} SkillItemProps 
 * @property {number} no
 * Number as skill item id
 * @property {string} logo
 * Skill item logo or image source
 * - Ex : `/logo/axios.png`
 * @property {string} logoDark
 * Skill item logo or image source while in dark mode, use `null` when not exist
 * - Ex : `/logo/axios.png`
 * @property {string} title
 * Skill item title
 * @property {string} description
 * Skill item description
*/

/**
 * @typedef {Array<SkillItemProps>} SkillSection 
*/

export const RootData = {};