import { screen, render } from "@testing-library/react";
import {
    expectRouterPush as _expectRouterPush,
    setupUseRouterMock,
} from "@/test/mock/useRouter";
import { setupUseAuthMock, UseAuthMockOptions } from "@/test/mock/useAuth";
import Tester, { AUTHORIZED_CONTENT_ID } from "./index.comp";
import "@testing-library/jest-dom";

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
    expect(screen.getByTestId(AUTHORIZED_CONTENT_ID)).toBeInTheDocument();

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

describe("_Guard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("allow", () => {
        setupMocks({ isAuthenticated: false });
        render(<Tester />);
        expectContentFound();
    });

    it("not-allow", () => {
        setupMocks({ isAuthenticated: true });
        render(<Tester />);
        expectContentUnauthorized("/");
    });
});
