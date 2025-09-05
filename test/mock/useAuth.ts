import { useAuth } from "@/sections/use-auth";
import { IUser } from "@/types/user";

// ------------------------------------------------------------------------------

jest.mock("@/sections/use-auth", () => ({
    useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// ------------------------------------------------------------------------------

interface UseAuthMockOptions {
    isAuthenticated: boolean;
    user?: IUser;
}

const setupUseAuthMock = (config?: UseAuthMockOptions) => {
    const { isAuthenticated = false, user = null } = config ?? {};

    mockUseAuth.mockReturnValue({
        isAuthenticated,
        user,
    } as any);
};

// ------------------------------------------------------------------------------

export { setupUseAuthMock };
export type { UseAuthMockOptions };
