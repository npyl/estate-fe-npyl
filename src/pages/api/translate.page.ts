import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next/types";

type ResponseData = {
    message: string;
};

export const config = {
    runtime: "edge",
};

const apiKey = "02d3203c-cf1f-45ad-a803-7bc398509b0c:fx";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const body = await req.body;

        return await fetch("https://api-free.deepl.com/v2/translate", {
            method: "POST",
            headers: {
                Authorization: `DeepL-Auth-Key ${apiKey}`,
                "Content-Type": "application/json",
            },
            body,
        });
    } catch (error) {
        console.error(error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
