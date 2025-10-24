import type { NextApiRequest, NextApiResponse } from "next/types";
import cookie from "cookie";
import toNumberSafe from "@/utils/toNumberSafe";

// ---------------------------------------------------------------------------

const COOKIE = "TEST_REFRESH_TOKEN_STATUS";

const getStatus = (req: NextApiRequest) => {
    const cookies = cookie.parse(req.headers.cookie || "");
    const status = toNumberSafe(cookies[COOKIE]);
    return status;
};

const setStatus = (res: NextApiResponse, status: string) => {
    // Set cookie
    res.setHeader(
        "Set-Cookie",
        cookie.serialize(COOKIE, status, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
        })
    );
};

// ---------------------------------------------------------------------------

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "GET") {
            const status = getStatus(req);
            if (status === -1) throw new Error("Calculated bad status");
            res.status(status).json({});
            return;
        }

        if (req.method === "POST") {
            const url = new URL(req.url || "", `http://${req.headers.host}`);
            const { searchParams } = url;

            const status = searchParams.get("status");
            if (!status) throw new Error("Bad status");

            // Set cookie
            setStatus(res, status);

            res.status(200).json({});
            return;
        }

        throw new Error("Bad method");
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
