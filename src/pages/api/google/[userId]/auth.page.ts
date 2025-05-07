import type { NextApiRequest, NextApiResponse } from "next/types";
import { toNumberSafe } from "@/utils/toNumber";
import managerService from "@/pages/api/google/_service/ManagerService";

interface IParams {
    userId: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.query as unknown as IParams;
        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw "Bad userId";

        // POST: authenticate user with id `userId`
        if (req.method === "POST") {
            const authUrl = await managerService.getAuthUrl(iUserId);
            res.status(200).json({
                authUrl,
            });
        }

        // GET: check if user with id `userId` is authenticated
        if (req.method === "GET") {
            const Authorization = req.headers.authorization;
            if (!Authorization) throw new Error("Invalid headers");

            const isAuthenticatedRes = await managerService.isAuthenticated(
                Authorization,
                iUserId
            );

            res.status(200).json(isAuthenticatedRes);
        }

        if (req.method === "DELETE") {
            await managerService.revokeAuthentication(iUserId);
            res.status(200).json({});
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
