/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

const config: Config = {
    testTimeout: 2 * 60 * 1000,

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Coverage
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageReporters: ["lcov"],

    // The test environment that will be used for testing
    testEnvironment: "jsdom",

    // Match **.test.(js|ts)(x)
    testMatch: ["**/?(*.)test.?([mc])[jt]s?(x)"],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ["\\\\node_modules\\\\", "\\\\test-e2e\\\\"],

    moduleNameMapper: {
        "^@/test/(.*)$": "<rootDir>/test/$1",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};

export default config;
