import sseService from "../SSEService";
import { NextRequest } from "next/server";

// INFO: force nodejs runtime that supports long-lived connections (see: https://github.com/vercel/next.js/discussions/48427#discussioncomment-5624604)
export const runtime = "edge";

// INFO: do not cache result
export const dynamic = "force-dynamic";

const onConnect = (clientId: string) => () => {
    // Check if buildId is valid
    const buildId = process.env.NEXT_PUBLIC_BUILD_ID || "";
    if (!buildId) {
        console.log("Could not retrieve buildId");
        return;
    }

    // Data
    const data = JSON.stringify({ buildId });

    // Send
    sseService.send(clientId, data);
};

export default async function handler(req: NextRequest) {
    try {
        if (req.method !== "GET") throw new Error("Bad method");

        const url = new URL(req.url);
        const clientId = url.searchParams.get("clientId");
        if (typeof clientId !== "string") throw new Error("Bad clientId");

        sseService.add(clientId, onConnect(clientId));

        req.signal.onabort = () => {
            sseService.delete(clientId);
        };

        const readableStream = sseService.getStream(clientId);
        if (!readableStream) throw new Error("Could not get readableStream");

        return new Response(readableStream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({
                error: "",
            }),
            { status: 400 }
        );
    }
}
