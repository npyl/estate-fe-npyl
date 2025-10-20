import fs from "node:fs/promises";
import { TOKEN_FILE_PATH } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/constants";
import { UserToken } from "@/pages/api/google/_service/ManagerService/AuthService/types";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import TestDoubleStore from "./Test";
import "@/_private/JSON";

// Mock only the filesystem layer
jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

// Test data constants
const TEST_DOMAIN = "example.com";
const OTHER_DOMAIN = "other.com";
const USER_ID_1 = 1;
const USER_ID_2 = 2;
const USER_ID_3 = 3;

const TOKEN_1: UserToken = {
    accessToken: "access1",
    refreshToken: "refresh1",
    expiryDate: 1000,
};

const TOKEN_2: UserToken = {
    accessToken: "access2",
    refreshToken: "refresh2",
    expiryDate: 2000,
};

const TOKEN_3: UserToken = {
    accessToken: "access3",
    refreshToken: "refresh3",
    expiryDate: 3000,
};

const UPDATED_TOKEN_1: UserToken = {
    accessToken: "newAccess1",
    refreshToken: "newRefresh1",
    expiryDate: 5000,
};

// Test helpers
const mockStoreData = (store: Store) =>
    mockedFs.readFile.mockResolvedValue(JSON.stringify(store));

const mockFileReadError = (error: Error = new Error("Read error")) => {
    mockedFs.readFile.mockRejectedValue(error);
};

const expectWrittenStore = (expectedStore: Store) =>
    expect(mockedFs.writeFile).toHaveBeenCalledWith(
        TOKEN_FILE_PATH,
        JSON.stringify(expectedStore, null, 2)
    );

describe("DoubleStore", () => {
    let store: TestDoubleStore;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new TestDoubleStore();
        store.setWorkspaceDomain(TEST_DOMAIN);

        // Default successful filesystem operations
        mockedFs.mkdir.mockResolvedValue(undefined);
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    describe("DOUBLE_initialise", () => {
        it("empty store", async () => {
            // File exists and is empty
            mockedFs.access.mockResolvedValue(undefined);
            mockStoreData({});

            const result = await store.testInitialize();

            expect(result).toBe(true);
            expect(store.testGet(USER_ID_1)).toBeUndefined();
        });

        it("non-empty store", async () => {
            const initialStore: Store = {
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                ],
            };

            // File exists with data
            mockedFs.access.mockResolvedValue(undefined);
            // Mock multiple readFile calls - one for initialize check, one for getAllTokens
            mockedFs.readFile.mockResolvedValue(JSON.stringify(initialStore));

            const result = await store.testInitialize();

            expect(result).toBe(true);
            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
            expect(store.testGet(USER_ID_2)).toEqual(TOKEN_2);
        });

        it("should handle tokens from multiple domains", async () => {
            const initialStore: Store = {
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
                [OTHER_DOMAIN]: [{ userId: USER_ID_2, ...TOKEN_2 }],
            };

            // File exists with data
            mockedFs.access.mockResolvedValue(undefined);
            // Mock readFile to return the store data
            mockedFs.readFile.mockResolvedValue(JSON.stringify(initialStore));

            const result = await store.testInitialize();

            expect(result).toBe(true);
            // Should only load tokens from TEST_DOMAIN
            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
            expect(store.testGet(USER_ID_2)).toBeUndefined();
        });

        describe("fails", () => {
            it("should return false when file creation fails", async () => {
                mockedFs.access.mockRejectedValue(
                    new Error("File does not exist")
                );
                mockedFs.mkdir.mockRejectedValue(
                    new Error("Permission denied")
                );

                const result = await store.testInitialize();

                expect(result).toBe(false);
            });

            it("should handle corrupted JSON gracefully", async () => {
                mockedFs.access.mockResolvedValue(undefined);
                mockedFs.readFile.mockResolvedValue("invalid json");

                const result = await store.testInitialize();

                expect(result).toBe(true);
                expect(store.testGet(USER_ID_1)).toBeUndefined();
            });
        });
    });

    describe("DOUBLE_set", () => {
        beforeEach(async () => {
            mockStoreData({});
            await store.testInitialize();
        });

        it("should save new token to both disk and memory", async () => {
            mockStoreData({});

            const result = await store.testSet(USER_ID_1, TOKEN_1);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });
            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
        });

        it("should update existing token in both disk and memory", async () => {
            mockStoreData({});
            await store.testSet(USER_ID_1, TOKEN_1);

            mockStoreData({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });

            const result = await store.testSet(USER_ID_1, UPDATED_TOKEN_1);

            expect(result).toBe(true);
            expectWrittenStore({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...UPDATED_TOKEN_1 }],
            });
            expect(store.testGet(USER_ID_1)).toEqual(UPDATED_TOKEN_1);
        });

        it("should return false when disk write fails", async () => {
            mockStoreData({});
            mockedFs.writeFile.mockRejectedValue(new Error("Write error"));

            const result = await store.testSet(USER_ID_1, TOKEN_1);

            expect(result).toBe(false);
            // Memory should NOT be updated when disk write fails
            expect(store.testGet(USER_ID_1)).toBeUndefined();
        });

        it("should handle multiple users independently", async () => {
            mockStoreData({});
            await store.testSet(USER_ID_1, TOKEN_1);

            mockStoreData({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });
            await store.testSet(USER_ID_2, TOKEN_2);

            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
            expect(store.testGet(USER_ID_2)).toEqual(TOKEN_2);
        });

        it("should not corrupt other domains data", async () => {
            const initialStore: Store = {
                [OTHER_DOMAIN]: [{ userId: USER_ID_2, ...TOKEN_2 }],
            };
            mockStoreData(initialStore);

            await store.testSet(USER_ID_1, TOKEN_1);

            expectWrittenStore({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
                [OTHER_DOMAIN]: [{ userId: USER_ID_2, ...TOKEN_2 }],
            });
        });

        it("should handle disk read errors gracefully during save", async () => {
            mockFileReadError();

            // Should still succeed as per TokenStorage behavior
            const result = await store.testSet(USER_ID_1, TOKEN_1);

            expect(result).toBe(true);
            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
        });
    });

    describe("DOUBLE_delete", () => {
        beforeEach(async () => {
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

    describe("DOUBLE_deleteAllTokens", () => {
        beforeEach(async () => {
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

    describe("DOUBLE_get", () => {
        beforeEach(async () => {
            const initialStore: Store = {
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                ],
            };
            mockStoreData(initialStore);
            await store.testInitialize();
        });

        it("should return token for existing user", () => {
            const result = store.testGet(USER_ID_1);
            expect(result).toEqual(TOKEN_1);
        });

        it("should return undefined for non-existent user", () => {
            const result = store.testGet(999);
            expect(result).toBeUndefined();
        });

        it("should return updated token after update", async () => {
            mockStoreData({
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                ],
            });
            await store.testSet(USER_ID_1, UPDATED_TOKEN_1);

            const result = store.testGet(USER_ID_1);
            expect(result).toEqual(UPDATED_TOKEN_1);
        });
    });

    describe("DOUBLE_getAll", () => {
        it("should return all tokens from memory", async () => {
            const initialStore: Store = {
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                ],
            };
            mockStoreData(initialStore);
            await store.testInitialize();

            const result = Array.from(store.testGetAll());

            expect(result).toHaveLength(2);
            expect(result).toContainEqual(TOKEN_1);
            expect(result).toContainEqual(TOKEN_2);
        });

        it("should return empty iterator when no tokens exist", async () => {
            mockStoreData({});
            await store.testInitialize();

            const result = Array.from(store.testGetAll());

            expect(result).toHaveLength(0);
        });

        it("should reflect changes after operations", async () => {
            const initialStore: Store = {
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                ],
            };
            mockStoreData(initialStore);
            await store.testInitialize();

            mockStoreData({
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                ],
            });
            await store.testDelete(USER_ID_1);

            const result = Array.from(store.testGetAll());

            expect(result).toHaveLength(1);
            expect(result).toContainEqual(TOKEN_2);
        });
    });

    describe("Edge cases and integration", () => {
        beforeEach(async () => {
            mockStoreData({});
            await store.testInitialize();
        });

        it("should handle userId of 0", async () => {
            mockStoreData({});

            const result = await store.testSet(0, TOKEN_1);

            expect(result).toBe(true);
            expect(store.testGet(0)).toEqual(TOKEN_1);
            expectWrittenStore({
                [TEST_DOMAIN]: [{ userId: 0, ...TOKEN_1 }],
            });
        });

        it("should handle negative userId", async () => {
            mockStoreData({});

            const result = await store.testSet(-1, TOKEN_1);

            expect(result).toBe(true);
            expect(store.testGet(-1)).toEqual(TOKEN_1);
        });

        it("should handle empty string tokens", async () => {
            mockStoreData({});
            const emptyToken: UserToken = {
                accessToken: "",
                refreshToken: "",
                expiryDate: 0,
            };

            const result = await store.testSet(USER_ID_1, emptyToken);

            expect(result).toBe(true);
            expect(store.testGet(USER_ID_1)).toEqual(emptyToken);
        });

        it("should maintain consistency between disk and memory operations", async () => {
            mockStoreData({});
            await store.testSet(USER_ID_1, TOKEN_1);

            mockStoreData({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });
            await store.testSet(USER_ID_2, TOKEN_2);

            mockStoreData({
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                ],
            });
            await store.testSet(USER_ID_3, TOKEN_3);

            mockStoreData({
                [TEST_DOMAIN]: [
                    { userId: USER_ID_1, ...TOKEN_1 },
                    { userId: USER_ID_2, ...TOKEN_2 },
                    { userId: USER_ID_3, ...TOKEN_3 },
                ],
            });
            await store.testDelete(USER_ID_1);

            expect(store.testGet(USER_ID_1)).toBeUndefined();
            expect(store.testGet(USER_ID_2)).toEqual(TOKEN_2);
            expect(store.testGet(USER_ID_3)).toEqual(TOKEN_3);

            const allTokens = Array.from(store.testGetAll());
            expect(allTokens).toHaveLength(2);
        });

        it("should handle rapid sequential operations", async () => {
            mockStoreData({});

            await Promise.all([
                store.testSet(USER_ID_1, TOKEN_1),
                store.testSet(USER_ID_2, TOKEN_2),
                store.testSet(USER_ID_3, TOKEN_3),
            ]);

            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
            expect(store.testGet(USER_ID_2)).toEqual(TOKEN_2);
            expect(store.testGet(USER_ID_3)).toEqual(TOKEN_3);
        });

        it("should not update memory if disk save fails", async () => {
            mockStoreData({});
            await store.testSet(USER_ID_1, TOKEN_1);

            mockStoreData({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });
            mockedFs.writeFile.mockRejectedValue(new Error("Write error"));

            await store.testSet(USER_ID_1, UPDATED_TOKEN_1);

            // Should still have old token in memory
            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
        });

        it("should not delete from memory if disk deletion fails", async () => {
            mockStoreData({});
            await store.testSet(USER_ID_1, TOKEN_1);

            mockStoreData({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });
            mockedFs.writeFile.mockRejectedValue(new Error("Delete error"));

            await store.testDelete(USER_ID_1);

            expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
        });
    });

    describe("Workspace domain handling", () => {
        it("should use correct workspace domain for all operations", async () => {
            const customDomain = "custom.com";
            store.setWorkspaceDomain(customDomain);

            mockStoreData({});
            await store.testInitialize();

            await store.testSet(USER_ID_1, TOKEN_1);

            expectWrittenStore({
                [customDomain]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });
        });

        it("should isolate tokens between different domains", async () => {
            const store1 = new TestDoubleStore();
            store1.setWorkspaceDomain(TEST_DOMAIN);

            const store2 = new TestDoubleStore();
            store2.setWorkspaceDomain(OTHER_DOMAIN);

            mockStoreData({});
            await store1.testInitialize();
            await store2.testInitialize();

            await store1.testSet(USER_ID_1, TOKEN_1);

            mockStoreData({
                [TEST_DOMAIN]: [{ userId: USER_ID_1, ...TOKEN_1 }],
            });
            await store2.testSet(USER_ID_2, TOKEN_2);

            expect(store1.testGet(USER_ID_1)).toEqual(TOKEN_1);
            expect(store1.testGet(USER_ID_2)).toBeUndefined();

            expect(store2.testGet(USER_ID_1)).toBeUndefined();
            expect(store2.testGet(USER_ID_2)).toEqual(TOKEN_2);
        });
    });
});
