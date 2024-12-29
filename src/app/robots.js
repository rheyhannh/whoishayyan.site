/**
 * @typedef {Object} RobotsRule
 * @property {string | string[]} [userAgent] 
 * The user agent(s) the rule applies to
 * @property {string | string[]} [allow] 
 * The path(s) that are allowed to be crawled
 * @property {string | string[]} [disallow] 
 * The path(s) that are disallowed from being crawled
 * @property {number} [crawlDelay] 
 * The delay (in seconds) between successive crawl requests
 */

/**
 * @typedef {Object} Robots
 * @property {RobotsRule | RobotsRule[]} rules 
 * The set of rules for web crawlers
 * @property {string | string[]} [sitemap] 
 * URL(s) of the sitemap(s) for the site
 * @property {string} [host] 
 * The preferred host for the site
 */

/** 
 * Method to generate a Robots
 * 
 * @returns {Robots} Robots or an `robots.txt`
 * @more {@link https://nextjs.org/docs/13/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file Next.js docs} and {@link https://en.wikipedia.org/wiki/Robots.txt#Standard Wikipedia}
 */
export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/components/'],
            disallow: ['/api/'],
        },
        sitemap: 'https://whoishayyan.site/sitemap.xml',
    }
}