/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'nextupeventdata.blob.core.windows.net',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: `/:path*`,
                has: [
                    {
                        type: 'host',
                        value: 'events.com',
                    },
                ],
            },
            {
                source: '/:path*',
                destination: `/admin/:path*`,
                has: [
                    {
                        type: 'host',
                        value: 'admin.events.com',
                    },
                ],
            },
        ]
    },
}

export default nextConfig