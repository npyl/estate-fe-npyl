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

    // -------------------------------------------------------------------------------------

    /**
     * Creates a RFC 2822 formatted email message encoded in base64url format
     * as required by the Gmail API
     */
    async send(
        userId: number,
        to: string[],
        subject: string,
        body: string,
        attachments?: Array<{
            filename: string;
            content: string;
            encoding: "base64" | "utf8";
            mimeType: string;
        }>
    ) {
        const auth = await managerService.getAuthForUser(userId);
        if (!auth) return null;

        // Extract primary recipient and CC recipients
        const primaryTo = to[0];
        const cc = to.slice(1);

        // Create message headers according to RFC 2822
        const headers: Record<string, string> = {
            "Content-Type": attachments?.length
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

        // Format headers according to RFC 2822
        const formattedHeaders = Object.entries(headers)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\r\n");

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
