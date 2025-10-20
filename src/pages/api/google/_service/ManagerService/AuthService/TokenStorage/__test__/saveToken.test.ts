import fs from "node:fs/promises";
import tokenService from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";
import { Store } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/types";
import {
    TEST_DOMAIN,
    OTHER_DOMAIN,
    SAMPLE_TOKENS,
    SINGLE_TOKEN,
    EMPTY_TOKENS,
    UPDATED_TOKEN,
    NEW_TOKEN,
    ERRORS,
    mockStoreData,
    mockFileReadError,
    mockFileWriteError,
    expectWrittenStore,
} from "./utils";
import "@/_private/JSON";

jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("TokenStorage - saveToken", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    it("should save new token for new user", async () => {
        const store: Store = { [TEST_DOMAIN]: SINGLE_TOKEN };
        mockStoreData(store);

        const result = await tokenService.saveToken(TEST_DOMAIN, NEW_TOKEN);

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [...SINGLE_TOKEN, NEW_TOKEN],
        });
    });

    it("should update token for existing user", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const result = await tokenService.saveToken(TEST_DOMAIN, UPDATED_TOKEN);

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: [UPDATED_TOKEN, SAMPLE_TOKENS[1]],
        });
    });

    it("should save token when domain is empty", async () => {
        const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
        mockStoreData(store);

        const result = await tokenService.saveToken(
            TEST_DOMAIN,
            SINGLE_TOKEN[0]
        );

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: SINGLE_TOKEN,
        });
    });

    it("should save token for new domain", async () => {
        const store: Store = { [TEST_DOMAIN]: SAMPLE_TOKENS };
        mockStoreData(store);

        const result = await tokenService.saveToken(
            OTHER_DOMAIN,
            SINGLE_TOKEN[0]
        );

        expect(result).toBe(true);
        expectWrittenStore({
            [TEST_DOMAIN]: SAMPLE_TOKENS,
            [OTHER_DOMAIN]: SINGLE_TOKEN,
        });
    });

    describe("I/O Errors", () => {
        it("should return false on write error", async () => {
            const store: Store = { [TEST_DOMAIN]: EMPTY_TOKENS };
            mockStoreData(store);
            mockFileWriteError(ERRORS.WRITE);

            const result = await tokenService.saveToken(
                TEST_DOMAIN,
                SINGLE_TOKEN[0]
            );

            expect(result).toBe(false);
        });

        it("should handle read error gracefully", async () => {
            mockFileReadError();

            const result = await tokenService.saveToken(
                TEST_DOMAIN,
                SINGLE_TOKEN[0]
            );

            // INFO: we don't care about fails; we only want to prevent crashes
            expect(result).toBe(true);
        });
    });
});
