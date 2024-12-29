/**
 * @typedef {Object} SitemapEntry
 * @property {string} url 
 * The URL of the page
 * @property {string | Date} [lastModified] 
 * The date the page was last modified
 * @property {'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'} [changeFrequency] 
 * How frequently the page is likely to change
 * @property {number} [priority] 
 * The priority of this URL relative to other URLs on the site
 */

/** 
 * Method to generate a Sitemap
 * 
 * @returns {SitemapEntry[]} Sitemap or an `sitemap.xml`
 * @more {@link https://nextjs.org/docs/13/app/api-reference/file-conventions/metadata/sitemap#generate-a-sitemap Next.js docs} and {@link https://www.sitemaps.org/protocol.html XML format}
 */
export default function sitemap() {
    return [
        {
            url: 'https://whoishayyan.site',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://whoishayyan.site/components',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]
}