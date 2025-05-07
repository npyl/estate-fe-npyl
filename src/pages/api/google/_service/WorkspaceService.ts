import managerService from "@/pages/api/google/_service/ManagerService";
import getCredentialsForUser, {
    GoogleWorkspaceKeys,
} from "./getCredentialsForUser";

// --------------------------------------------------------------------------------

const baseUrl = `${process.env.BACKEND_API_URL}/company/socials/google-workspace`;

// --------------------------------------------------------------------------------

class WorkspaceService {
    constructor() {}

    /**
     * Check if pp-user by Authorization belongs to a company that is integrated with a Google Workspace;
     * Our backend already supports company by authorization token, therefore we do not need to care about multitenacy.
     * @param Authorization
     */
    async isIntegrated(Authorization: string) {
        const creds = await getCredentialsForUser(Authorization);
        return creds;
    }

    async updateIntegration(Authorization: string, keys: GoogleWorkspaceKeys) {
        const response = await fetch(baseUrl, {
            method: "PUT",
            body: JSON.stringify(keys),
            headers: {
                Authorization,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw await response.json();

        await managerService.updateKeys(Authorization, keys);
    }

    async deleteIntegration(userId: number, Authorization: string) {
        const response = await fetch(baseUrl, {
            method: "DELETE",
            headers: {
                Authorization,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw await response.json();

        await managerService.dropGoogleWorkspace(userId);
    }
}

// ---------------------------------------------------------------------

// singleton.ts
const WorkspaceServiceSingleton = () => {
    return new WorkspaceService();
};

declare global {
    // eslint-disable-next-line no-var
    var workspaceGlobal:
        | undefined
        | ReturnType<typeof WorkspaceServiceSingleton>;
}

const workspaceService =
    globalThis.workspaceGlobal ?? WorkspaceServiceSingleton();

if (process.env.NODE_ENV !== "production")
    globalThis.workspaceGlobal = workspaceService;

// ------------------------------------------------------------------------------

export default workspaceService;
