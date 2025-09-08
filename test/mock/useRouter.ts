import sleep from "@/utils/sleep";
import { useRouter } from "next/router";

const PUSH_REDIRECT_TIMEOUT = 1000; // 1sec

// ----------------------------------------------------------------------------------------

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

/**
 * router.push() - simulate a redirect by waiting for 1sec
 */
const mockPush = jest
    .fn()
    .mockImplementation(() => sleep(PUSH_REDIRECT_TIMEOUT));

// ----------------------------------------------------------------------------------------

const JSONParseSafe = (s: string) => {
    try {
        return JSON.parse(s);
    } catch (ex) {
        // ignore...
        return null;
    }
};

const expectPath = (calledWith: string, href: string) => {
    const res = JSONParseSafe(calledWith);

    // OK, calledWith should be equal to href
    if (!res) return calledWith === href;

    return "pathname" in res && res.pathname === href;
};

const expectRouterPush = (href: string = "") => {
    expect(mockPush).toHaveBeenCalledTimes(1);
    const calledWith = mockPush.mock.calls[0][0];
    expectPath(calledWith, href);
};

// ----------------------------------------------------------------------------------------

const mockRouterEvents = {
    on: jest.fn(),
    off: jest.fn(),
};

interface IOptions {
    isReady?: boolean;
}

const setupUseRouterMock = (options?: IOptions) =>
    mockUseRouter.mockReturnValue({
        push: mockPush,
        isReady: true,
        events: mockRouterEvents,
        ...(options ?? {}),
    } as any);

// ----------------------------------------------------------------------------------------

export { PUSH_REDIRECT_TIMEOUT, setupUseRouterMock, expectRouterPush };
export type { IOptions };
