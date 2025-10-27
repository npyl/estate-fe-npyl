import TestDoubleStore from "./Test";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    mockedFs,
    TEST_DOMAIN,
    OTHER_DOMAIN,
    USER_ID_1,
    USER_ID_2,
    USER_ID_3,
    TOKEN_1,
    TOKEN_2,
    TOKEN_3,
    mockStoreData,
    mockFileReadError,
    expectWrittenStore,
    setupDefaultMocks,
} from "./utils";
// Mock only the filesystem layer
jest.mock("node:fs/promises");

describe("DoubleStore - DOUBLE_deleteAllTokens", () => {
    let store: TestDoubleStore;

    beforeEach(async () => {
        jest.clearAllMocks();
        store = new TestDoubleStore();
        store.setWorkspaceDomain(TEST_DOMAIN);
        setupDefaultMocks();

        const initialStore: Store = {
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
                { userId: USER_ID_3, ...TOKEN_3 },
            ],
        };
        mockStoreData(initialStore);
        await store.testInitialize();
    });

    it("should delete all tokens from both disk and memory", async () => {
        mockStoreData({
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
                { userId: USER_ID_3, ...TOKEN_3 },
            ],
        });

        const result = await store.testDeleteAll();

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [],
        });
        expect(store.testGet(USER_ID_1)).toBeUndefined();
        expect(store.testGet(USER_ID_2)).toBeUndefined();
        expect(store.testGet(USER_ID_3)).toBeUndefined();
        expect(Array.from(store.testGetAll())).toHaveLength(0);
    });

    it("should return false when disk deletion fails", async () => {
        mockStoreData({
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
            ],
        });
        mockedFs.writeFile.mockRejectedValue(new Error("Write error"));

        const result = await store.testDeleteAll();

        expect(result).toBe(false);
        // Memory should NOT be cleared when disk write fails
        expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
        expect(store.testGet(USER_ID_2)).toEqual(TOKEN_2);
    });

    it("should not affect other domains", async () => {
        const multiDomainStore: Store = {
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
            ],
            [OTHER_DOMAIN]: [{ userId: USER_ID_3, ...TOKEN_3 }],
        };
        mockStoreData(multiDomainStore);

        const result = await store.testDeleteAll();

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [],
            [OTHER_DOMAIN]: [{ userId: USER_ID_3, ...TOKEN_3 }],
        });
    });

    it("should handle deletion when store is already empty", async () => {
        mockStoreData({ [TEST_DOMAIN]: [] });
        await store.testDeleteAll();

        mockStoreData({ [TEST_DOMAIN]: [] });
        const result = await store.testDeleteAll();

        expect(result).toBe(true);
        expectWrittenStore({ [TEST_DOMAIN]: [] });
    });

    it("should handle disk read errors gracefully", async () => {
        mockFileReadError();

        const result = await store.testDeleteAll();

        expect(result).toBe(true);
    });
});
