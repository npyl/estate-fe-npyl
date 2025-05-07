import type { NextApiRequest, NextApiResponse } from "next/types";
import managerService from "@/pages/api/google/_service/ManagerService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        sendCloseWindowResponse(res);
        return;
    }

    if (!req.url) {
        sendCloseWindowResponse(res);
        return;
    }

    const url = new URL(req.url!, `http://${req.headers.host}`);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
        sendCloseWindowResponse(res);
        return;
    }

    try {
        await managerService.handleAuthCallback(code, state);

        sendCloseWindowResponse(res, true);
    } catch (ex) {
        console.error(ex);
        sendCloseWindowResponse(res, false);
    }
}

/**
 * Sends a message to all(?) windows that we succeeded or failed with our oauth login process;
 * Used by initial browser window to determine whether login succeeded.
 */
function sendCloseWindowResponse(
    res: NextApiResponse,
    success: boolean = false
) {
    const type = success ? "GOOGLE_AUTH_SUCCESS" : "GOOGLE_AUTH_ERROR";

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
            <body>
                <script>
                    window.opener.postMessage({ type: "${type}" }, "*");                    
                    window.close();
                </script>
            </body>
        </html>
    `);
}
