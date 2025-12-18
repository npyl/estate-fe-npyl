import type { TransformOptions } from "@babel/core";

const config: TransformOptions = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
    ],
    plugins: ["babel-plugin-dynamic-import-node"],
};

export default config;
