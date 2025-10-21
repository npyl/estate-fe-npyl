import TestDoubleStore from "./Test";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    mockedFs,
    TEST_DOMAIN,
    USER_ID_1,
    USER_ID_2,
    TOKEN_1,
    TOKEN_2,
    mockStoreData,
    mockFileReadError,
    expectWrittenStore,
    setupDefaultMocks,
} from "./utils";
// Mock only the filesystem layer
jest.mock("node:fs/promises");

describe("DoubleStore - DOUBLE_delete", () => {
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
            ],
        };
        mockStoreData(initialStore);
        await store.testInitialize();
    });

    it("should delete token from both disk and memory", async () => {
        mockStoreData({
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
            ],
        });

        const result = await store.testDelete(USER_ID_1);

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [{ userId: USER_ID_2, ...TOKEN_2 }],
        });
        expect(store.testGet(USER_ID_1)).toBeUndefined();
        expect(store.testGet(USER_ID_2)).toEqual(TOKEN_2);
    });

    it("should return false when disk deletion fails", async () => {
        mockStoreData({
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
            ],
        });
        mockedFs.writeFile.mockRejectedValue(new Error("Delete error"));

        const result = await store.testDelete(USER_ID_1);

        expect(result).toBe(false);
        // Memory should NOT be updated when disk write fails
        expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
    });

    it("should handle deletion of non-existent user gracefully", async () => {
        mockStoreData({
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
            ],
        });

        const result = await store.testDelete(999);

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [
                { userId: USER_ID_1, ...TOKEN_1 },
                { userId: USER_ID_2, ...TOKEN_2 },
            ],
        });
    });

    it("should handle disk read errors gracefully during delete", async () => {
        mockFileReadError();

        const result = await store.testDelete(USER_ID_1);

        // Should succeed as per TokenStorage behavior
        expect(result).toBe(true);
    });
});
