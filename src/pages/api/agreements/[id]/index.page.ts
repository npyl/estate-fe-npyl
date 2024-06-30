import { NextRequest, NextResponse } from "next/server";

export const config = {
    runtime: "edge",
};

const fake = {
    variant: "purchase",
    id: 2,
    draft: true,
    title: "Property x101 Purchase",
    lang: "en",
} as any;

export default async function GET(req: NextRequest) {
    try {
        return new NextResponse(JSON.stringify(fake), {
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
