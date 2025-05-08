import { gmail_v1, gmail } from "@googleapis/gmail";
import { OAuth2Client } from "google-auth-library";
import managerService from "@/pages/api/google/_service/ManagerService";
import { IEmailFilters } from "@/types/email";

type TMessage = gmail_v1.Schema$Message;

class GmailService {
    private gmail: gmail_v1.Gmail;

    constructor() {
        this.gmail = gmail({ version: "v1" });
    }

    // -------------------------------------------------------------------------------------

    private messagePromise =
        (auth: OAuth2Client, from: string) =>
        (acc: Promise<TMessage>[], m: TMessage) => {
            const { id } = m || {};
            if (!Boolean(id)) return acc;

            acc.push(this._getEmail(auth, id!, from));
            return acc;
        };

    async filter(
        userId: number,
        filters: IEmailFilters,
        maxResults: number,
        pageToken?: string
    ) {
        const auth = await managerService.getAuthForUser(userId);
        if (!auth) return [];

        // TODO: see https://groups.google.com/g/golang-nuts/c/ZwsrCQEj4sQ for "from" support ???
        const { from, to, propertyIds } = filters;

        let parts = [];
        if (from) parts.push(`from:${from}`);
        if (to) parts.push(`to:${to}`);
        const q = parts.join(" ");

        const res = await this.gmail.users.messages.list({
            auth,
            userId: "me",
            maxResults,
            pageToken,
            q,
        });

        const promises =
            res?.data?.messages?.reduce(this.messagePromise(auth, from), []) ||
            [];

        const messages = await Promise.all(promises);

        return { ...(res?.data || {}), messages };
    }

    // -------------------------------------------------------------------------------------

    private async _getEmail(auth: OAuth2Client, id: string, userId: string) {
        const res = await this.gmail.users.messages.get({
            auth,
            userId,
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
