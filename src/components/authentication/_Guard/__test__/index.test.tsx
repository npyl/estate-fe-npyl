import { useAuth } from "@/sections/use-auth";
import { screen, render } from "@testing-library/react";
import { useRouter } from "next/router";
import Tester, { DIV_TESTID } from "./index.comp";
import "@testing-library/jest-dom";

// ----------------------------------------------------------------------------------------------

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

const expectRouterPush = (href: string = "/401") => {
    expect(mockPush).toHaveBeenCalledTimes(1);
    const calledWith = mockPush.mock.calls[0][0];
    expectPath(calledWith, href);
};

// ----------------------------------------------------------------------------------------------

const expectContentFound = () =>
    expect(screen.getByTestId(DIV_TESTID)).toBeInTheDocument();

const expectContentUnauthorized = (href?: string) => {
    let unauthorized = true;
    try {
        expectContentFound();

        // INFO: reaching here should not be possible
        unauthorized = false;
    } catch (ex) {
        // ignore...
    }
    expect(unauthorized).toBe(true);
    expectRouterPush(href);
};

// ----------------------------------------------------------------------------------------

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock("@/sections/use-auth", () => ({
    useAuth: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockPush = jest.fn();

interface MockOptions {
    isAuthenticated?: boolean;
    user?: any;
}

const setupMocks = (options: MockOptions) => {
    const { isAuthenticated = false, user = null } = options;

    // Mock router
    mockUseRouter.mockReturnValue({
        push: mockPush,
        isReady: true,
    } as any);

    // Mock auth
    mockUseAuth.mockReturnValue({
        isAuthenticated,
        user,
    } as any);
};

// ----------------------------------------------------------------------------------------

const allowCb = (_: any, isAuthenticated: boolean) => isAuthenticated;

describe("_Guard", () => {
    it("allow", () => {
        setupMocks({ isAuthenticated: true });
        render(<Tester allowCb={allowCb} />);
        expectContentFound();
    });
    it("not-allow, redirect (default) & protect content during redirect", () => {
        setupMocks({ isAuthenticated: false });
        render(<Tester allowCb={allowCb} />);
        expectContentUnauthorized();
    });
    it("not-allow, redirect (other) & protect content during redirect", () => {
        setupMocks({ isAuthenticated: false });
        render(<Tester allowCb={allowCb} redirectHref="/login" />);
        expectContentUnauthorized("/login");
    });
});
