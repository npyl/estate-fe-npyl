import { NextRequest, NextResponse } from "next/server";

interface IDownloadPropertyPDFReq {
    url: string;
}

export const config = {
    runtime: "edge",
};

export default async function POST(req: NextRequest) {
    try {
        const { url } = (await req.json()) as IDownloadPropertyPDFReq;
        if (!url) throw new Error("Bad Url!");

        const result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
            },
        });

        if (!result.ok) {
            throw new Error("Failed to fetch the PDF file");
        }

        // Stream the PDF directly
        return new NextResponse(result.body, {
            status: 200,
            headers: { "Content-Type": "application/pdf" },
        });
    } catch (error) {
        console.error(error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
