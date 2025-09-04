import { renderHook } from "@testing-library/react";
import useCookieKey, { BASENAME } from ".";

const TASK_ID = "123";

// -------------------------------------------------------------------------------

jest.mock("next/router", () => ({
    useRouter: () => ({
        query: {
            taskId: TASK_ID,
        },
    }),
}));

// -------------------------------------------------------------------------------

const getRenderedValue = (quickCreate: boolean) =>
    renderHook(() => useCookieKey(quickCreate))?.result?.current;

describe("useCookieKey", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    test("w/ taskId (non-quickCreate)", () => {
        const res = getRenderedValue(false);
        expect(res).toBe(`${BASENAME}-${TASK_ID}`);
    });
    test("w/ taskId (quickCreate)", () => {
        const res = getRenderedValue(true);
        expect(res).toBe(null);
    });
});
