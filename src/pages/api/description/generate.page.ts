import { IOpenAIDetails } from "@/types/openai";
import type { NextApiRequest, NextApiResponse } from "next/types";
import rtfToHtml from "@iarna/rtf-to-html";
import { extractRTFContent } from "./_util";

const baseUrl = `${process.env.BACKEND_API_URL}/property/description/generate`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log("API ROUTE!");

        if (req.method !== "POST") throw new Error("Bad method");

        const Authorization = req.headers.authorization || "";

        console.log("received: ", req.body);

        const body = req.body as string;
        if (!body) throw new Error("Bad body");

        const isStyled = Boolean(JSON.parse(body).styling);

        const promise = await fetch(baseUrl, {
            headers: {
                Authorization,
                "Content-Type": "application/json",
            },
            method: "POST",
            body,
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
