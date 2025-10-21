import TestDoubleStore from "./Test";
import { UserToken } from "@/pages/api/google/_service/ManagerService/AuthService/types";
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
    UPDATED_TOKEN_1,
    mockStoreData,
    expectWrittenStore,
    setupDefaultMocks,
} from "./utils";
// Mock only the filesystem layer
jest.mock("node:fs/promises");

describe("DoubleStore - Edge cases and integration", () => {
    let store: TestDoubleStore;

    beforeEach(async () => {
        jest.clearAllMocks();
        store = new TestDoubleStore();
        store.setWorkspaceDomain(TEST_DOMAIN);
        setupDefaultMocks();

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
