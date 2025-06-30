/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.cloudfront.net",
                port: "",
                pathname: "/**",
            },
        ],
    },

    turbopack: {},

    experimental: {
        optimizePackageImports: ["@mui/material", "@mui/icons-material"],
    },
};

export default config;
