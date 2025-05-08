import { gmail_v1, gmail } from "@googleapis/gmail";
import { OAuth2Client } from "google-auth-library";
import managerService from "@/pages/api/google/_service/ManagerService";

type TMessage = gmail_v1.Schema$Message;

class GmailService {
    private gmail: gmail_v1.Gmail;

    constructor() {
        this.gmail = gmail({ version: "v1" });
    }

    // -------------------------------------------------------------------------------------

    private messagePromise =
        (auth: OAuth2Client) => (acc: Promise<TMessage>[], m: TMessage) => {
            const { id } = m || {};
            if (!Boolean(id)) return acc;

            acc.push(this._getEmail(auth, id!));
            return acc;
        };

    async filter(userId: number, maxResults: number, pageToken?: string) {
        const auth = await managerService.getAuthForUser(userId);
        if (!auth) return [];

        const res = await this.gmail.users.messages.list({
            auth,
            userId: "me",
            maxResults,
            pageToken,
        });

        const promises =
            res?.data?.messages?.reduce(this.messagePromise(auth), []) || [];

        const messages = await Promise.all(promises);

        return { ...(res?.data || {}), messages };
    }

    // -------------------------------------------------------------------------------------

    private async _getEmail(auth: OAuth2Client, id: string) {
        const res = await this.gmail.users.messages.get({
            auth,
            userId: "me",
            id,
        });

        return res.data;
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
