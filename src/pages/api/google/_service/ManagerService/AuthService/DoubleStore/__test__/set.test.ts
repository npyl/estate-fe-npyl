import TestDoubleStore from "./Test";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    mockedFs,
    TEST_DOMAIN,
    OTHER_DOMAIN,
    USER_ID_1,
    USER_ID_2,
    TOKEN_1,
    TOKEN_2,
    mockStoreData,
    setupDefaultMocks,
} from "./utils";
// Mock only the filesystem layer
jest.mock("node:fs/promises");

describe("DoubleStore - DOUBLE_initialise", () => {
    let store: TestDoubleStore;

    beforeEach(() => {
        jest.clearAllMocks();
        store = new TestDoubleStore();
        store.setWorkspaceDomain(TEST_DOMAIN);
        setupDefaultMocks();
    });

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
        mockedFs.readFile.mockResolvedValue(JSON.stringify(initialStore));

        const result = await store.testInitialize();

        expect(result).toBe(true);
        // Should only load tokens from TEST_DOMAIN
        expect(store.testGet(USER_ID_1)).toEqual(TOKEN_1);
        expect(store.testGet(USER_ID_2)).toBeUndefined();
    });

    describe("fails", () => {
        it("should return false when file creation fails", async () => {
            mockedFs.access.mockRejectedValue(new Error("File does not exist"));
            mockedFs.mkdir.mockRejectedValue(new Error("Permission denied"));

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
