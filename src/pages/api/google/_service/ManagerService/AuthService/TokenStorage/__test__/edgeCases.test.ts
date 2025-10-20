import fs from "node:fs/promises";
import tokenService from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";
import {
    StoredToken,
    Store,
} from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    TEST_DOMAIN,
    OTHER_DOMAIN,
    SAMPLE_TOKENS,
    SINGLE_TOKEN,
    EMPTY_TOKENS,
    mockStoreData,
    expectWrittenStore,
    getLastWrittenData,
} from "./utils";
import "@/_private/JSON";

jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("TokenStorage - Edge Cases", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    it("should handle multiple token updates for same user (keeping last one)", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const updatedToken1 = {
            userId: 1,
            accessToken: "updated1",
            refreshToken: "updatedRefresh1",
            expiryDate: 9000,
        };
        await tokenService.saveToken(TEST_DOMAIN, updatedToken1);

        // Re-mock with the updated store for the next call
        const intermediateStore: Store = {
            [TEST_DOMAIN]: [updatedToken1, SAMPLE_TOKENS[1]],
        };
        mockStoreData(intermediateStore);

        const finalToken = {
            userId: 1,
            accessToken: "final1",
            refreshToken: "finalRefresh1",
            expiryDate: 10000,
        };
        await tokenService.saveToken(TEST_DOMAIN, finalToken);

        const writtenData = getLastWrittenData();
        const userToken = writtenData[TEST_DOMAIN].find(
            (t: StoredToken) => t.userId === 1
        );
        expect(userToken?.accessToken).toBe("final1");
        expect(userToken?.refreshToken).toBe("finalRefresh1");
        expect(userToken?.expiryDate).toBe(10000);
    });

    it("should handle userId of 0", async () => {
        const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
        mockStoreData(store);

        const result = await tokenService.saveToken(TEST_DOMAIN, {
            userId: 0,
            accessToken: "access0",
            refreshToken: "refresh0",
            expiryDate: 0,
        });

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [
                {
                    userId: 0,
                    accessToken: "access0",
                    refreshToken: "refresh0",
                    expiryDate: 0,
                },
            ],
        });
    });

    it("should handle negative userId", async () => {
        const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
        mockStoreData(store);

        const result = await tokenService.saveToken(TEST_DOMAIN, {
            userId: -1,
            accessToken: "accessNeg",
            refreshToken: "refreshNeg",
            expiryDate: -1,
        });

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [
                {
                    userId: -1,
                    accessToken: "accessNeg",
                    refreshToken: "refreshNeg",
                    expiryDate: -1,
                },
            ],
        });
    });

    it("should handle empty string as tokens", async () => {
        const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
        mockStoreData(store);

        const result = await tokenService.saveToken(TEST_DOMAIN, {
            userId: 1,
            accessToken: "",
            refreshToken: "",
            expiryDate: 0,
        });

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [
                {
                    userId: 1,
                    accessToken: "",
                    refreshToken: "",
                    expiryDate: 0,
                },
            ],
        });
    });

    it("should handle very long tokens", async () => {
        const longToken = "a".repeat(10000);
        const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
        mockStoreData(store);

        const result = await tokenService.saveToken(TEST_DOMAIN, {
            userId: 1,
            accessToken: longToken,
            refreshToken: longToken,
            expiryDate: 999999,
        });

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [
                {
                    userId: 1,
                    accessToken: longToken,
                    refreshToken: longToken,
                    expiryDate: 999999,
                },
            ],
        });
    });

    it("should handle multiple domains independently", async () => {
        const store: Store = {
            [TEST_DOMAIN]: SAMPLE_TOKENS,
            [OTHER_DOMAIN]: SINGLE_TOKEN,
        };
        mockStoreData(store);

        const newToken: StoredToken = {
            userId: 3,
            accessToken: "access3",
            refreshToken: "refresh3",
            expiryDate: 3000,
        };
        const result = await tokenService.saveToken(TEST_DOMAIN, newToken);

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [...SAMPLE_TOKENS, newToken],
            [OTHER_DOMAIN]: SINGLE_TOKEN,
        });
    });
});

describe("TokenStorage - Singleton behavior", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create singleton in non-production environment", () => {
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = "development";

        expect(tokenService).toBeDefined();
        expect((globalThis as any).tokenServiceGlobal).toBeDefined();

        process.env.NODE_ENV = originalEnv;
    });

    it("should create singleton in production environment", () => {
        const originalEnv = process.env.NODE_ENV;
        const originalGlobal = (globalThis as any).tokenServiceGlobal;

        process.env.NODE_ENV = "production";
        delete (globalThis as any).tokenServiceGlobal;

        expect(tokenService).toBeDefined();

        process.env.NODE_ENV = originalEnv;
        (globalThis as any).tokenServiceGlobal = originalGlobal;
    });
});
