import debugLog from "@/_private/debugLog";
import type { NextApiRequest, NextApiResponse } from "next/types";

/**
 * @param req Next JS Request Object
 * @returns a url that definitely starts with "https://"
 */
const getNormalisedUrl = (req: NextApiRequest) => {
    const { url: _url } = req.query;
    if (!_url || typeof _url !== "string") throw new Error("Bad url");
    return _url.startsWith("https://") ? _url : `https://${_url}`;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== "GET") throw new Error("Bad method");

        const url = getNormalisedUrl(req);

        const response = await fetch(url);
        if (!response.ok) throw await response.json();

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Set proper headers
        res.setHeader("Content-Type", blob.type || "image/jpeg");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        return res.send(buffer);
    } catch (error) {
        debugLog(error);
        return res.status(500).json({ error: "" });
    }
}
