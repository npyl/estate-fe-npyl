import sleep from "@/utils/sleep";
import type { NextApiRequest, NextApiResponse } from "next/types";

export const config = {
    api: {
        bodyParser: false, // Disable body parsing to handle raw file data
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Prevent running in production
    if (process.env.NODE_ENV === "production") {
        return res.status(404).json({ error: "Not found" });
    }

    // Set CORS headers for all requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle CORS preflight request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only allow PUT requests
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Read the raw body data with simulated chunked processing
        const chunks: Buffer[] = [];
        let totalBytesReceived = 0;
        let expectedContentLength = 0;

        // Get expected content length from headers
        const contentLengthHeader = req.headers["content-length"];
        if (contentLengthHeader) {
            expectedContentLength = parseInt(contentLengthHeader, 10);
        }

        await new Promise<void>((resolve, reject) => {
            req.on("data", async (chunk: Buffer) => {
                chunks.push(chunk);
                totalBytesReceived += chunk.length;

                // Add artificial delay to simulate network transfer time
                // This helps trigger the progress events in XMLHttpRequest
                await sleep(50); // Small delay per chunk
            });

            req.on("end", async () => {
                // Add final processing delay
                await sleep(200);
                resolve();
            });

            req.on("error", (err) => {
                reject(err);
            });
        });

        // Combine all chunks into a single buffer
        const fileBuffer = Buffer.concat(chunks);

        // Get content type from headers
        const contentType = req.headers["content-type"];
        if (!contentType) {
            throw new Error("Could not find contentType");
        }

        // Log file info for debugging
        console.log(`Received file upload:`, {
            size: fileBuffer.length,
            expectedSize: expectedContentLength,
            contentType,
            timestamp: new Date().toISOString(),
        });

        // Return success with file info
        res.status(200).json({});
    } catch (error) {
        console.error(error);
        res.status(500).json({});
    }
}
