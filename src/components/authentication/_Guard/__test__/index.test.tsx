import { screen, render } from "@testing-library/react";
import {
    expectRouterPush as _expectRouterPush,
    PUSH_REDIRECT_TIMEOUT,
    setupUseRouterMock,
} from "@/test/mock/useRouter";
import { setupUseAuthMock, UseAuthMockOptions } from "@/test/mock/useAuth";
import Tester, { DIV_TESTID } from "./index.comp";

// ----------------------------------------------------------------------------------------------

const expectRouterPush = (href: string = "/401") => _expectRouterPush(href);

// ----------------------------------------------------------------------------------------------

interface MockOptions extends UseAuthMockOptions {}

const setupMocks = (options?: MockOptions) => {
    setupUseRouterMock();
    setupUseAuthMock(options);
};

// ----------------------------------------------------------------------------------------------

const expectContentFound = () =>
    expect(screen.getByTestId(DIV_TESTID)).toBeInTheDocument();

const expectContentUnauthorized = async (href?: string) => {
    let unauthorized = true;
    try {
        expectContentFound();

        // INFO: reaching here should not be possible
        unauthorized = false;
    } catch (ex) {
        // ignore...
    }
    expect(unauthorized).toBe(true);

    // Wait for the async redirect to complete
    await waitForRedirectComplete();

    expectRouterPush(href);
};

// Helper to simulate async redirect and repeatedly check content doesn't appear
const waitForRedirectComplete = async () => {
    const checkInterval = 10; // Check every 10ms
    const totalDuration = PUSH_REDIRECT_TIMEOUT; // Total wait time of 100ms
    const checks = totalDuration / checkInterval;

    for (let i = 0; i < checks; i++) {
        // Ensure content is still not visible during redirect
        expect(screen.queryByTestId(DIV_TESTID)).not.toBeInTheDocument();

        // Wait before next check
        await new Promise((resolve) => setTimeout(resolve, checkInterval));
    }
};

// ----------------------------------------------------------------------------------------

const allowCb = (_: any, isAuthenticated: boolean) => isAuthenticated;

describe("_Guard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("allow", () => {
        setupMocks({ isAuthenticated: true });
        render(<Tester allowCb={allowCb} />);
        expectContentFound();
    });

    it("not-allow, redirect (default) & protect content during redirect", async () => {
        setupMocks({ isAuthenticated: false });
        render(<Tester allowCb={allowCb} />);
        await expectContentUnauthorized();
    });

    it("not-allow, redirect (other) & protect content during redirect", async () => {
        setupMocks({ isAuthenticated: false });
        render(<Tester allowCb={allowCb} redirectHref="/login" />);
        await expectContentUnauthorized("/login");
    });
});
