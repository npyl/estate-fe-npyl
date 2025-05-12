import { gmail_v1, gmail } from "@googleapis/gmail";
import { OAuth2Client } from "google-auth-library";
import managerService from "@/pages/api/google/_service/ManagerService";
import { IEmailFilters, IEmailReq, TEmailRes } from "@/types/email";
import { toNumberSafe } from "@/utils/toNumber";

type TMessage = gmail_v1.Schema$Message;

const PROPERTY_IDS_HEADER_NAME = "X-Property-Ids";

const getQ = ({ from, to }: IEmailFilters) => {
    let parts = [];
    if (from) parts.push(`from:${from}`);
    if (to) parts.push(`to:${to}`);
    return parts.join(" ");
};

const getSender = (m: gmail_v1.Schema$Message) => {
    const { payload } = m || {};
    const { headers } = payload || {};

    const h = headers?.find(({ name }) => name?.toLowerCase() === "from");

    const value = h?.value || "";

    // Remove any content that looks like <something>
    return value.replace(/<[^>]*>/g, "");
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
    propertyIds?: number[],
    hasAttachments: boolean = false
): string => {
    // Extract primary recipient and CC recipients
    const primaryTo = to[0];
    const cc = to.slice(1);

    // Create message headers according to RFC 2822
    const headers: Record<string, string> = {
        "Content-Type": hasAttachments
            ? `multipart/mixed; boundary="boundary_mixed"`
            : `text/html; charset="UTF-8"`,
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

class GmailService {
    private gmail: gmail_v1.Gmail;

    constructor() {
        this.gmail = gmail({ version: "v1" });
    }

    // -------------------------------------------------------------------------------------

    private messagePromise =
        (
            auth: OAuth2Client,
            from: string,
            withPropertyIds: boolean,
            propertyIds: number[]
        ) =>
        async (message: TMessage): Promise<TEmailRes | null> => {
            const { id } = message || {};
            if (!id) return null;

            if (withPropertyIds) {
                const HEADER_IDS = await this._getEmailPropertyIds(
                    auth,
                    id,
                    from
                );

                const found = propertyIds.some((pid) =>
                    HEADER_IDS.includes(pid)
                );

                if (!found) return null;
            }

            return this._getEmail(auth, id, from);
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
        const withPropertyIds =
            Array.isArray(propertyIds) && propertyIds.length > 0;

        const q = getQ(filters);

        const res = await this.gmail.users.messages.list({
            auth,
            userId: "me",
            maxResults,
            pageToken,
            q,
        });

        const all = res?.data?.messages ?? [];

        const promises = all.map(
            this.messagePromise(auth, from, withPropertyIds, propertyIds)
        );

        const messageResults = await Promise.all(promises);
        const messages = messageResults.filter(
            (m): m is TEmailRes => m !== null
        );

        return { ...(res?.data || {}), messages };
    }

    // -------------------------------------------------------------------------------------

    private async _getEmailPropertyIds(
        auth: OAuth2Client,
        id: string,
        userId: string
    ): Promise<number[]> {
        const res = await this.gmail.users.messages.get({
            auth,
            userId,
            id,
            format: "metadata",
            metadataHeaders: [PROPERTY_IDS_HEADER_NAME],
        });

        const h = res.data?.payload?.headers ?? [];

        const headerName = h.find(
            ({ name }) =>
                name?.toLowerCase() === PROPERTY_IDS_HEADER_NAME.toLowerCase()
        );

        if (!headerName?.value) return [];

        const ids = headerName.value.split(",").map((id) => toNumberSafe(id));

        return ids;
    }

    private async _getEmail(
        auth: OAuth2Client,
        id: string,
        userId: string
    ): Promise<TEmailRes> {
        const res = await this.gmail.users.messages.get({
            auth,
            userId,
            id,
        });

        const m = res.data as TEmailRes;

        return { ...m, from: getSender(m) };
    }

    // -------------------------------------------------------------------------------------

    /**
     * Creates a RFC 2822 formatted email message encoded in base64url format
     * as required by the Gmail API
     */
    async send(
        userId: number,
        _body: IEmailReq,
        attachments?: Array<{
            filename: string;
            content: string;
            encoding: "base64" | "utf8";
            mimeType: string;
        }>
    ) {
        const auth = await managerService.getAuthForUser(userId);
        if (!auth) return null;

        const { to, subject, body, propertyIds } = _body;

        // Use the new getHeaders method
        const formattedHeaders = getHeaders(
            to,
            subject,
            propertyIds,
            !!attachments?.length
        );

        let emailContent: string;

        if (attachments?.length) {
            // Create multipart email with attachments
            let messageParts = [
                // Start with headers
                formattedHeaders,
                "", // Empty line to separate headers from body
                "--boundary_mixed",
                `Content-Type: text/html; charset="UTF-8"`,
                "Content-Transfer-Encoding: quoted-printable",
                "",
                body,
            ];

            // Add each attachment
            for (const attachment of attachments) {
                const filename = attachment.filename.replace(/"/g, '\\"');
                messageParts.push(
                    "--boundary_mixed",
                    `Content-Type: ${attachment.mimeType}; name="${filename}"`,
                    `Content-Disposition: attachment; filename="${filename}"`,
                    `Content-Transfer-Encoding: ${attachment.encoding === "base64" ? "base64" : "7bit"}`,
                    "Content-ID: <attachment>",
                    "",
                    attachment.content
                );
            }

            // Close the multipart message
            messageParts.push("--boundary_mixed--");

            // Join all parts with proper CRLF line endings
            emailContent = messageParts.join("\r\n");
        } else {
            // Simple email without attachments
            emailContent = `${formattedHeaders}\r\n\r\n${body}`;
        }

        // Encode the message as base64url as required by Gmail API
        const raw = Buffer.from(emailContent)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

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
