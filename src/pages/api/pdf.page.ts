import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next/types";

const rawUrl = "https://raw.githubusercontent.com/npyl/temp/main/buyer.pdf";

type ResponseData = {
    message: string;
};

export const config = {
    runtime: "experimental-edge",
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const result = await fetch(rawUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
            },
        });

        if (!result.ok) {
            throw new Error("Failed to fetch the PDF file");
        }

        const arrayBuffer = await result.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");

        return new NextResponse(base64String, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
