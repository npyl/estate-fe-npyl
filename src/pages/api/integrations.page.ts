import { NextRequest, NextResponse } from "next/server";

export const config = {
    runtime: "edge",
};

const baseUrl = `${process.env.BACKEND_API_URL}/integrations`;

export async function GET(req: NextRequest) {
    try {
        const propertyId = req.nextUrl.searchParams.get("propertyId");
        const integrationSite = req.nextUrl.searchParams.get("integrationSite");

        const res = await fetch(
            `${baseUrl}/image-order/${propertyId}?integrationSite=${integrationSite}`
        );
    } catch (error) {
        console.error(error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
    } catch (error) {
        console.error(error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
