import type { NextApiRequest, NextApiResponse } from "next/types";
import workspaceService from "./_service/WorkspaceService";
import { toNumberSafe } from "@/utils/toNumber";

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
            const creds = await workspaceService.isIntegrated(Authorization);
            res.status(200).json({
                isIntegrated: Boolean(creds),
                domain: creds?.domain,
            });
        }

        /**
         * Update
         */
        if (req.method === "PUT") {
            const body = await req.body;
            if (!body) throw new Error("Bad body");

            await workspaceService.updateIntegration(Authorization, body);

            res.status(200).json({});
        }

        /**
         * Remove
         */
        if (req.method === "DELETE") {
            const url = new URL(req.url!, `http://${req.headers.host}`);
            const userId = url.searchParams.get("userId") as string;
            const iUserId = toNumberSafe(userId);
            if (iUserId === -1) throw "Bad userId";

            await workspaceService.deleteIntegration(iUserId, Authorization);
            res.status(200).json({});
        }
    } catch (ex) {
        console.error(ex);
        res.status(404).json({});
    }
}
