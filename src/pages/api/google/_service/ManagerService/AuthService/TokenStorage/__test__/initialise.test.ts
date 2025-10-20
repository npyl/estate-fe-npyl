import fs from "node:fs/promises";
import path from "node:path";
import tokenService from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage";
import { TOKEN_FILE_PATH } from "@/pages/api/google/_service/ManagerService/AuthService/TokenStorage/constants";
import { ERRORS } from "./utils";
import "@/_private/JSON";

jest.mock("node:fs/promises");

const mockedFs = fs as jest.Mocked<typeof fs>;

describe("TokenStorage - initialize", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedFs.writeFile.mockResolvedValue(undefined);
    });

    it("should create directory & file if not existent", async () => {
        mockedFs.mkdir.mockResolvedValue(undefined);
        mockedFs.access.mockRejectedValue(ERRORS.FILE_NOT_EXIST);
        mockedFs.writeFile.mockResolvedValue(undefined);

        const result = await tokenService.initialize();

        expect(result).toBe(true);
        expect(mockedFs.mkdir).toHaveBeenCalledWith(
            path.dirname(TOKEN_FILE_PATH),
            { recursive: true }
        );
        expect(mockedFs.writeFile).toHaveBeenCalledWith(
            TOKEN_FILE_PATH,
            JSON.stringify({}, null, 2)
        );
    });

    it("should not create file if it already exists", async () => {
        mockedFs.access.mockResolvedValue(undefined);

        const result = await tokenService.initialize();

        expect(result).toBe(true);
        expect(mockedFs.access).toHaveBeenCalledWith(TOKEN_FILE_PATH);
        expect(mockedFs.writeFile).not.toHaveBeenCalled();
    });

    it("should fail gracefully on permission error", async () => {
        mockedFs.access.mockRejectedValue(ERRORS.FILE_NOT_EXIST);
        mockedFs.mkdir.mockRejectedValue(ERRORS.PERMISSION_DENIED);

        const result = await tokenService.initialize();

        expect(result).toBe(false);
    });
});
