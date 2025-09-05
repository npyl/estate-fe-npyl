import Tester, { AUTHORIZED_CONTENT_ID } from "./index.comp";
import { render, screen } from "@testing-library/react";
import AuthGuard from "@/components/authentication/auth-guard";
import { useRouter } from "next/router";
import { useAuth } from "@/sections/use-auth";
import { IUser } from "@/types/user";
import AdminGuard, {
    ADMIN_GUARD_TESTID,
} from "@/components/authentication/admin-guard";
import { ComponentType, PropsWithChildren } from "react";
import AgreementsGuard from "@/components/authentication/agreements-guard";
import MessagesGuard from "../messages-guard";
import NotificationsGuard from "../notification-guard";
import TasksGuard from "../tasks-guard";
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

// ----------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------

const expectAdminSubGuard = (
    GuardComponent: ComponentType<PropsWithChildren>,
    userOther: Partial<IUser>
) => {
    setupMocks({
        isAuthenticated: true,
        user: { ...ADMIN_USER, ...userOther },
    });
    render(<Tester GuardComponent={GuardComponent} />);
    expect(screen.getByTestId(ADMIN_GUARD_TESTID)).toBeInTheDocument();
};

// ----------------------------------------------------------------------------------------------

const describeGuard = (name: string, fn: jest.EmptyFunction) =>
    describe(name, () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        fn();
    });

// ----------------------------------------------------------------------------------------------

describe("auth-guards", () => {
    describeGuard("auth", () => {
        it("non-authenticated", () => {
            setupMocks({ isAuthenticated: false });
            render(<Tester GuardComponent={AuthGuard} />);
            expectContentUnauthorized("/login");
        });
        it("authenticated", () => {
            setupMocks({ isAuthenticated: true });
            render(<Tester GuardComponent={AuthGuard} />);
            expectContentFound();
        });
    });

    describeGuard("admin", () => {
        it("non-authenticated, non-admin", () => {
            setupMocks({ isAuthenticated: false, user: NON_ADMIN_USER });
            render(<Tester GuardComponent={AdminGuard} />);
            expectContentUnauthorized("/login");
        });
        it("non-authenticated, admin", () => {
            setupMocks({ isAuthenticated: false, user: ADMIN_USER });
            render(<Tester GuardComponent={AdminGuard} />);
            expectContentUnauthorized("/login");
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

    describeGuard("agreements", () => {
        it("non-authenticated", () => {
            expectAdminSubGuard(AgreementsGuard, { agreementsEnabled: false });
            expectContentUnauthorized();
        });
        it("authenticated", () => {
            expectAdminSubGuard(AgreementsGuard, { agreementsEnabled: true });
            expectContentFound();
        });
    });

    describeGuard("messages", () => {
        it("non-authenticated", () => {
            expectAdminSubGuard(MessagesGuard, { messagingEnabled: false });
            expectContentUnauthorized();
        });
        it("authenticated", () => {
            expectAdminSubGuard(MessagesGuard, { messagingEnabled: true });
            expectContentFound();
        });
    });

    describeGuard("notification", () => {
        it("non-authenticated", () => {
            setupMocks({
                isAuthenticated: true,
                user: { ...ADMIN_USER, notificationsEnabled: false },
            });
            render(<Tester GuardComponent={NotificationsGuard} />);
            expectContentUnauthorized();
        });
        it("authenticated", () => {
            setupMocks({
                isAuthenticated: true,
                user: { ...ADMIN_USER, notificationsEnabled: true },
            });
            render(<Tester GuardComponent={NotificationsGuard} />);
            expectContentFound();
        });
    });

    describeGuard("tasks", () => {
        it("non-authenticated", () => {
            expectAdminSubGuard(TasksGuard, { tasksEnabled: "NONE" });
            expectContentUnauthorized();
        });
        it("authenticated (ALL)", () => {
            expectAdminSubGuard(TasksGuard, { tasksEnabled: "ALL" });
            expectContentFound();
        });
        it("authenticated (OWN)", () => {
            expectAdminSubGuard(TasksGuard, { tasksEnabled: "OWN" });
            expectContentFound();
        });
    });
});
