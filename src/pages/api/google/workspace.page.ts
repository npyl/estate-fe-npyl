import type { NextApiRequest, NextApiResponse } from "next/types";
import getCredentialsForUser from "./getCredentialsForUser";

// -----------------------------------------------------------------------

const baseUrl = `${process.env.BACKEND_API_URL}/company/socials/google-workspace`;

// -----------------------------------------------------------------------

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (
            req.method !== "GET" &&
            req.method !== "PUT" &&
            req.method !== "DELETE"
        )
            throw new Error("Bad method");

        const Authorization = req.headers.authorization;
        if (!Authorization) throw new Error("Invalid headers");

        /**
         * isIntegrated
         */
        if (req.method === "GET") {
            const creds = await getCredentialsForUser(Authorization);
            res.status(200).json({ isIntegrated: Boolean(creds) });
        }

        /**
         * Update
         */
        if (req.method === "PUT") {
            const body = await req.body;
            if (!body) throw new Error("Bad body");

            const response = await fetch(baseUrl, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    Authorization,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw await response.json();

            res.status(200).json({});
        }

        /**
         * Remove
         */
        if (req.method === "DELETE") {
            const response = await fetch(baseUrl, {
                method: "DELETE",
                headers: {
                    Authorization,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw await response.json();

            res.status(200).json({});
        }
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
