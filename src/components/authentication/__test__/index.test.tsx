import Tester, { AUTHORIZED_CONTENT_ID } from "./index.comp";
import { render, screen } from "@testing-library/react";
import AuthGuard from "@/components/authentication/auth-guard";
import { useRouter } from "next/router";
import { useAuth } from "@/sections/use-auth";
import { IUser } from "@/types/user";
import AdminGuard from "@/components/authentication/admin-guard";
import "@testing-library/jest-dom";

const expectContentFound = () =>
    expect(screen.getByTestId(AUTHORIZED_CONTENT_ID)).toBeInTheDocument();

const expectContentUnauthorized = () => {
    let unauthorized = true;
    try {
        expectContentFound();

        // INFO: reaching here should not be possible
        unauthorized = false;
    } catch (ex) {
        // ignore...
    }
    expect(unauthorized).toBe(true);
};

const NON_ADMIN_USER: IUser = {
    id: 1,
    isAdmin: false,
    ...({} as any),
};
const ADMIN_USER: IUser = {
    id: 2,
    isAdmin: true,
    ...({} as any),
};

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
    const { isAuthenticated = false, user = null } = options ?? {};

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

describe("auth-guards", () => {
    describe("guest", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("non-authenticated", () => {});
        it("authenticated", () => {});
    });

    describe("auth", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("non-authenticated", () => {
            setupMocks({ isAuthenticated: false });
            render(<Tester GuardComponent={AuthGuard} />);
            expectContentUnauthorized();
        });
        it("authenticated", () => {
            setupMocks({ isAuthenticated: true });
            render(<Tester GuardComponent={AuthGuard} />);
            expectContentFound();
        });
    });

    describe("admin", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("non-authenticated, non-admin", () => {
            setupMocks({ isAuthenticated: false, user: NON_ADMIN_USER });
            render(<Tester GuardComponent={AdminGuard} />);
            expectContentUnauthorized();
        });
        it("non-authenticated, admin", () => {
            setupMocks({ isAuthenticated: false, user: ADMIN_USER });
            render(<Tester GuardComponent={AdminGuard} />);
            expectContentUnauthorized();
        });
        it("authenticated, non-admin", () => {
            setupMocks({ isAuthenticated: true, user: NON_ADMIN_USER });
            render(<Tester GuardComponent={AdminGuard} />);
            expectContentUnauthorized();
        });
        it("authenticated, admin", () => {
            setupMocks({ isAuthenticated: true, user: ADMIN_USER });
            render(<Tester GuardComponent={AdminGuard} />);
            expectContentFound();
        });
    });

    describe("agreements", () => {
        it("non-authenticated", () => {});
        it("authenticated", () => {});
    });

    describe("messages", () => {
        it("non-authenticated", () => {});
        it("authenticated", () => {});
    });

    describe("notification", () => {
        it("non-authenticated", () => {});
        it("authenticated", () => {});
    });

    describe("tasks", () => {
        it("non-authenticated", () => {});
        it("authenticated", () => {});
    });
});
