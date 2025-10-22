import getCredentialsForUser, {
    GoogleWorkspaceKeys,
} from "@/pages/api/google/_service/getCredentialsForUser";
import {
    AUTHORIZATION0,
    AUTHORIZATION1,
    WORKSPACE0,
    WORKSPACE1,
} from "@/pages/api/google/_service/ManagerService/__test__/constants";

// ------------------------------------------------------------------

type AuthorizationType = typeof AUTHORIZATION0 | typeof AUTHORIZATION1;

const AUTHORIZATION_DOMAIN_MAP: Record<AuthorizationType, GoogleWorkspaceKeys> =
    {
        [AUTHORIZATION0]: WORKSPACE0,
        [AUTHORIZATION1]: WORKSPACE1,
    };

const getKeysForAuthorization = async (
    Authorization: string
): Promise<GoogleWorkspaceKeys> =>
    AUTHORIZATION_DOMAIN_MAP[Authorization as AuthorizationType];

// ------------------------------------------------------------------

jest.mock("@/pages/api/google/_service/getCredentialsForUser");

const mockGetCredentialsForUser = getCredentialsForUser as jest.MockedFunction<
    typeof getCredentialsForUser
>;

const setupMockGetCredentialsForUser = () => {
    mockGetCredentialsForUser.mockImplementation(getKeysForAuthorization);
};

export type { AuthorizationType };
export { setupMockGetCredentialsForUser };
