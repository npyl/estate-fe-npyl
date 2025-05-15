import { gmail_v1, gmail } from "@googleapis/gmail";
import { OAuth2Client } from "google-auth-library";
import managerService from "@/pages/api/google/_service/ManagerService";
import {
    IEmailFilters,
    IEmailReq,
    TEmailRes,
    IAttachment,
} from "@/types/email";
import { toNumberSafe } from "@/utils/toNumber";

type TThread = gmail_v1.Schema$Thread;

const PROPERTY_IDS_HEADER_NAME = "X-Property-Ids";

const isPropertyIdsHeader = ({ name }: gmail_v1.Schema$MessagePartHeader) =>
    name?.toLowerCase() === PROPERTY_IDS_HEADER_NAME.toLowerCase();

const messageToIds = ({ payload }: gmail_v1.Schema$Message) => {
    const { headers } = payload || {};

    const h = headers?.find(isPropertyIdsHeader);
    if (!h) return [];

    const v = h?.value;
    if (!v) return [];

    return v.split(",").map(toNumberSafe);
};

const getQ = ({ from, to }: IEmailFilters) => {
    let parts = [];
    if (from) parts.push(`from:${from}`);
    if (to) parts.push(`to:${to}`);
    return parts.join(" ");
};

/**
 * Creates RFC 2822 compliant email headers
 * @param to - Array of recipients
 * @param subject - Email subject line
 * @param propertyIds - Optional array of property IDs for custom headers
 * @param hasAttachments - Whether the email contains attachments
 * @returns Object containing both raw headers and formatted headers string
 */
const getHeaders = (
    to: string[],
    subject: string,
    propertyIds?: number[]
): string => {
    // Extract primary recipient and CC recipients
    const primaryTo = to[0];
    const cc = to.slice(1);

    // Create message headers according to RFC 2822
    const headers: Record<string, string> = {
        "Content-Type": `text/html; charset="UTF-8"`,
        "MIME-Version": "1.0",
        To: primaryTo,
        Subject: subject,
    };

    // Add CC if there are additional recipients
    if (cc.length > 0) {
        headers["Cc"] = cc.join(", ");
    }

    if (propertyIds && propertyIds.length > 0) {
        // Use X- prefix for custom headers
        headers[PROPERTY_IDS_HEADER_NAME] = propertyIds.join(",");
    }

    // Format headers according to RFC 2822
    const formattedHeaders = Object.entries(headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\r\n");

    return formattedHeaders;
};

/**
 * Creates a multipart MIME message with attachments
 * @param headers - Email headers
 * @param body - Email body
 * @param attachments - Array of pre-encoded attachment objects
 * @returns Base64url encoded message string
 */
const createMultipartMessage = async (
    headers: string,
    body: string,
    attachments: IAttachment[]
): Promise<string> => {
    const boundary = `----=${Date.now()}.${Math.random()}`;
    const messageParts: string[] = [];

    // Start with main headers, but replace Content-Type to multipart/mixed
    const mainHeaders = headers.replace(
        /Content-Type: text\/html; charset="UTF-8"/,
        `Content-Type: multipart/mixed; boundary="${boundary}"`
    );

    messageParts.push(mainHeaders);
    messageParts.push("");

    // Add the text/html part
    messageParts.push(`--${boundary}`);
    messageParts.push('Content-Type: text/html; charset="UTF-8"');
    messageParts.push("");
    messageParts.push(body);
    messageParts.push("");

    // Add attachments
    for (const attachment of attachments) {
        messageParts.push(`--${boundary}`);
        messageParts.push(`Content-Type: ${attachment.type}`);
        messageParts.push("Content-Transfer-Encoding: base64");
        messageParts.push(
            `Content-Disposition: attachment; filename="${attachment.name}"`
        );
        messageParts.push("");
        messageParts.push(attachment.base64);
        messageParts.push("");
    }

    // End boundary
    messageParts.push(`--${boundary}--`);

    // Join all parts with CRLF
    const message = messageParts.join("\r\n");

    // Encode as base64url
    const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    return encodedMessage;
};

type ThreadMetadata = {
    subject: string;
    from: string;
    snippet: string;
    ids: number[];
};

class GmailService {
    private gmail: gmail_v1.Gmail;

    constructor() {
        this.gmail = gmail({ version: "v1" });
    }

    // -------------------------------------------------------------------------------------

    /**
     * Fetches comprehensive thread metadata including subject, snippet, and sender info
     */
    private async _getThreadMetadata(
        auth: OAuth2Client,
        threadId: string,
        userId: string,
        withPropertyIds: boolean
    ): Promise<ThreadMetadata> {
        try {
            const res = await this.gmail.users.threads.get({
                auth,
                userId,
                id: threadId,
                format: "metadata",
                metadataHeaders: [PROPERTY_IDS_HEADER_NAME, "Subject", "From"],
            });

            const thread = res.data;
            const m = thread.messages || [];

            // Get the first message for subject and from
            const firstMessage = m[0];

            let subject = "";
            let from = "";

            if (
                firstMessage &&
                firstMessage.payload &&
                firstMessage.payload.headers
            ) {
                const headers = firstMessage.payload.headers;

                const subjectHeader = headers.find(
                    (h) => h.name?.toLowerCase() === "subject"
                );
                const fromHeader = headers.find(
                    (h) => h.name?.toLowerCase() === "from"
                );

                subject = subjectHeader?.value || "";
                from = fromHeader?.value || "";
            }

            // Get snippet from the thread
            const snippet = thread.snippet || "";

            // PropertyIds
            let ids: number[] = [];
            if (withPropertyIds) {
                const idSet = new Set(m.map(messageToIds).flat());
                ids = Array.from(idSet);
            }

            return { subject, from, snippet, ids };
        } catch (error) {
            console.error(error);
            return { subject: "", from: "", snippet: "", ids: [] };
        }
    }

    /**
     * Receive data for a thread + support filtering by propertyIds
     * @returns thread with metadata including subject, from, and snippet
     */
    private ti =
        (auth: OAuth2Client, userId: string, propertyIds: number[]) =>
        async (thread: TThread): Promise<TEmailRes | null> => {
            const { id } = thread || {};
            if (!id) return null;

            const withPropertyIds = propertyIds.length > 0;

            const METADATA = await this._getThreadMetadata(
                auth,
                id,
                userId,
                withPropertyIds
            );

            if (withPropertyIds) {
                const HEADER_IDS = METADATA.ids;

                const found = propertyIds.some((pid) =>
                    HEADER_IDS.includes(pid)
                );

                if (!found) return null;
            }

            return { ...thread, subject: METADATA.subject } as TEmailRes;
        };

    async filter(
        userId: number,
        filters: IEmailFilters,
        maxResults: number,
        pageToken?: string
    ) {
        const auth = await managerService.getAuthForUser(userId);
        if (!auth) return [];

        const { from, propertyIds = [] } = filters;

        const q = getQ(filters);

        const res = await this.gmail.users.threads.list({
            auth,
            userId: "me",
            maxResults,
            pageToken,
            q,
        });

        const all = res?.data?.threads ?? [];

        // Get thread info
        const p = all.map(this.ti(auth, from, propertyIds));
        const threadsWithInfo = await Promise.all(p);

        // Filter nulls
        const threads = threadsWithInfo.filter((m) => m !== null);

        return { ...(res?.data || {}), threads };
    }

    // -------------------------------------------------------------------------------------

    /**
     * Creates a RFC 2822 formatted email message encoded in base64url format
     * as required by the Gmail API
     */
    async send(userId: number, _body: IEmailReq) {
        const auth = await managerService.getAuthForUser(userId);
        if (!auth) return null;

        const { to, subject, body, propertyIds, attachments } = _body;

        // Use the new getHeaders method
        const formattedHeaders = getHeaders(to, subject, propertyIds);

        let raw: string;

        if (attachments && attachments.length > 0) {
            // Create multipart message with attachments
            raw = await createMultipartMessage(
                formattedHeaders,
                body,
                attachments
            );
        } else {
            // Simple email without attachments
            const emailContent = `${formattedHeaders}\r\n\r\n${body}`;

            // Encode the message as base64url as required by Gmail API
            raw = Buffer.from(emailContent)
                .toString("base64")
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
        }

        // Send the email
        await this.gmail.users.messages.send({
            auth,
            userId: "me",
            requestBody: {
                raw,
            },
        });
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
