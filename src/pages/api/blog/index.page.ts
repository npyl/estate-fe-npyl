import type { NextApiRequest, NextApiResponse } from "next/types";
import { BlogPostReq } from "@/types/company";
import removeAllImages from "./_service/removeAllImages";
import createOrUpdate from "./_service/createOrUpdate";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "POST") throw new Error("Bad method");

        const Authorization = req.headers?.authorization || "";
        if (!Authorization) throw new Error("Bad Authorization");

        const d = req.body as Omit<BlogPostReq, "images">;

        //
        // Remove (if any) previous images
        //
        await removeAllImages(Authorization, d.id);

        //
        //  Run create or update
        //
        await createOrUpdate(Authorization, d);

        res.status(200).json({});
    } catch (error) {
        console.error("Error:", error);
        res.status(404).json({});
    }
}
