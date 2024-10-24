import type { NextApiRequest, NextApiResponse } from "next/types";
import calendarService from "./_service/CalendarService";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.redirect(302, "/calendar"); // TODO: Redirect to an error page
        return;
    }
    if (!req.url) {
        res.redirect(302, "/calendar"); // TODO: Redirect to an error page
        return;
    }

    const url = new URL(req.url!, `http://${req.headers.host}`);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
        res.redirect(302, "/calendar"); // TODO: Redirect to an error page
        return;
    }
    if (typeof code !== "string" || typeof state !== "string") {
        res.redirect(302, "/calendar"); // TODO: Redirect to an error page
        return;
    }

    try {
        await calendarService.handleAuthCallback(code!, state!);

        // INFO: here we are sending a redirect status (308 a.k.a. permanent to keep our credentials in crm) and the redirect happens thanks to google
        res.redirect(302, "/calendar");
    } catch (ex) {
        console.error(ex);

        // INFO: here we are sending a redirect status (308 a.k.a. permanent to keep our credentials in crm) and the redirect happens thanks to google
        res.redirect(302, "/calendar"); // TODO: Redirect to an error page
    }
}
