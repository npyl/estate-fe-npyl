import TestDoubleStore from "./Test";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    TEST_DOMAIN,
    USER_ID_1,
    USER_ID_2,
    TOKEN_1,
    TOKEN_2,
    UPDATED_TOKEN_1,
    mockStoreData,
    setupDefaultMocks,
} from "./utils";
import "@/_private/JSON";

// Mock only the filesystem layer
jest.mock("node:fs/promises");

describe("DoubleStore - DOUBLE_get & DOUBLE_getAll", () => {
    let store: TestDoubleStore;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new TestDoubleStore();
        store.setWorkspaceDomain(TEST_DOMAIN);
        setupDefaultMocks();
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
});
