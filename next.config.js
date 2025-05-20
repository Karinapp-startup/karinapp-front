/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com', 'github.com'],
    },

    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                ],
            },
        ]
    },

    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000']
        }
    },

    webpack: (config, { dev, isServer }) => {
        // Optimizaciones de producción
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 20000,
                maxSize: 244000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    framework: {
                        chunks: 'all',
                        name: 'framework',
                        test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
                        priority: 40,
                        enforce: true,
                    },
                    lib: {
                        test(module) {
                            return module.size() > 160000 &&
                                /node_modules[/\\]/.test(module.identifier())
                        },
                        name(module) {
                            const hash = crypto.createHash('sha1')
                            hash.update(module.identifier())
                            return hash.digest('hex').substring(0, 8)
                        },
                        priority: 30,
                        minChunks: 1,
                        reuseExistingChunk: true,
                    },
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: 20,
                    },
                    shared: {
                        name(module, chunks) {
                            return crypto
                                .createHash('sha1')
                                .update(chunks.map(c => c.name).join('_'))
                                .digest('hex')
                        },
                        priority: 10,
                        minChunks: 2,
                        reuseExistingChunk: true,
                    },
                },
            }
        }
        return config
    },

    async redirects() {
        return [
            {
                source: '/denuncias/nueva',
                destination: '/complaints/new',
                permanent: true,
            }
        ]
    },
}

module.exports = nextConfig 