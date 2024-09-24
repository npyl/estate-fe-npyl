module.exports = {
    reactStrictMode: false,
    pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
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
};
