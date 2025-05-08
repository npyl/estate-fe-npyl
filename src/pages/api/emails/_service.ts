import { gmail_v1, gmail } from "@googleapis/gmail";
import managerService from "@/pages/api/google/_service/ManagerService";

class GmailService {
    private gmail: gmail_v1.Gmail;

    constructor() {
        this.gmail = gmail({ version: "v1" });
    }

    async filter(userId: number) {
        const auth = await managerService.getAuthForUser(userId);
        if (!auth) return [];

        const res = await this.gmail.users.messages.list({
            auth,
            userId: "me",
            // maxResults: 10, // TODO: pagination
        });

        return res?.data?.messages ?? [];
    }
}

// ------------------------------------------------------------------------------

const GmailServiceSingleton = () => {
    return new GmailService();
};

declare global {
    // eslint-disable-next-line no-var
    var gmailGlobal: undefined | ReturnType<typeof GmailServiceSingleton>;
}

const gmailService = globalThis.gmailGlobal ?? GmailServiceSingleton();

if (process.env.NODE_ENV !== "production")
    globalThis.gmailGlobal = gmailService;

// ------------------------------------------------------------------------------

export default gmailService;
