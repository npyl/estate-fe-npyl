import type { NextApiRequest, NextApiResponse } from "next/types";
import toNumberSafe from "@/utils/toNumberSafe";
import getBlogPostById from "../_service/getBlogPostById";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "GET") throw new Error("Bad method");

        const Authorization = req.headers?.authorization || "";
        if (!Authorization) throw new Error("Bad Authorization");

        // postId
        const { postId } = req.query;
        const iPostId = toNumberSafe(postId);
        if (iPostId === -1) throw new Error("Bad postId");

        const json = await getBlogPostById(Authorization, iPostId);

        res.status(200).json(json);
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
