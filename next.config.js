/** @type {import('next').NextConfig} */
module.exports = {
    experimental: {
        serverActions: true,
    },
    images: {
        minimumCacheTTL: 259200
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'no-store, must-revalidate' },
                ],
            },
            {
                source: '/sipk_mockup_full.png',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=604800, must-revalidate' },
                ]
            }
        ]
    }
}
