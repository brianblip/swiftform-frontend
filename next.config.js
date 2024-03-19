const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: isProd ? '/swiftform' : '',
    assetPrefix: isProd ? 'https://internship.boomtech.co/swiftform' : undefined,
};

module.exports = nextConfig;
