import { IOpenAIDetails } from "@/types/openai";
import type { NextApiRequest, NextApiResponse } from "next/types";
import rtfToHtml from "@iarna/rtf-to-html";

const baseUrl = `${process.env.BACKEND_API_URL}/property/description/improve`;

/**
 * Extracts RTF content from a string that contains RTF markup within backticks
 * @param {string} text - Input text containing RTF content within backticks
 * @returns {string} - The extracted RTF content, or empty string if no match found
 */
function extractRTFContent(text: string): string {
    // Match content between backticks that starts with "rtf"
    const rtfRegex = /`rtf\s*([\s\S]*?)`/;
    const match = text.match(rtfRegex);

    // Return the captured RTF content or empty string if no match
    return match ? match[1].trim() : "";
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log("API ROUTE!");

        if (req.method !== "POST") throw new Error("Bad method");

        const Authorization = req.headers.authorization || "";

        const body = req.body as IOpenAIDetails;
        if (!body) throw new Error("Bad body");

        const isStyled = Boolean(body.styling);

        const promise = await fetch(baseUrl, {
            headers: {
                Authorization,
                "Content-Type": "text/plain",
            },
            method: "POST",
            body: JSON.stringify(body),
        });

        if (!promise.ok) throw await promise.json();

        let data = await promise.json();

        if (isStyled) {
            // keep only rtf content
            data = extractRTFContent(data);
            // convert to html
            data = await new Promise<string>((resolve, reject) => {
                rtfToHtml.fromString(
                    data,
                    null,
                    (error: Error | null, html?: string) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(html || "");
                    }
                );
            });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);

        return res.status(500).json({});
    }
}
