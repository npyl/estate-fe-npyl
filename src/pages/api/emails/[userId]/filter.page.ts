import type { NextApiRequest, NextApiResponse } from "next/types";
import gmailService from "../_service";
import { toNumberSafe } from "@/utils/toNumber";
import { IEmailFilters } from "@/types/email";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "POST") throw "Bad method";

        // UserId
        const { userId } = req.query;
        const iUserId = toNumberSafe(userId);
        if (iUserId === -1) throw "Bad userId";

        const url = new URL(req.url!, `http://${req.headers.host}`);

        // PageSize
        const pageSize = url.searchParams.get("pageSize");
        if (!pageSize) throw "Bad pageSize";
        const iPageSize = toNumberSafe(pageSize);
        if (iPageSize === -1) throw "PageSize is not a number";

        // PageToken
        const pageToken = url.searchParams.get("pageToken") ?? undefined;

        const filters = req.body as IEmailFilters;

        // Data
        const data = await gmailService.filter(
            iUserId,
            filters,
            iPageSize,
            pageToken
        );
        const ret = data ?? [];

        res.status(200).json(ret);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
