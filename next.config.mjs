const buildId = new Date().getTime().toString();

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: false,
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    eslint: {
        ignoreDuringBuilds: true,
    },
    modularizeImports: {
        "@mui/material": {
            transform: "@mui/material/{{member}}",
        },
        "@mui/icons-material": {
            transform: "@mui/icons-material/{{member}}",
        },
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

    env: {
        NEXT_PUBLIC_BUILD_ID: buildId,
    },
};

export default config;
