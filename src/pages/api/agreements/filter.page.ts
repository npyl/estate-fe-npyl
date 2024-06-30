import { NextRequest, NextResponse } from "next/server";

const data = [
    {
        variant: "basic",
        id: 1,
        draft: false,
        title: "Property x100 Basic",
    } as any,
    {
        variant: "purchase",
        id: 2,
        draft: true,
        title: "Property x101 Purchase",
    } as any,
];

export const config = {
    runtime: "edge",
};

export default async function POST(req: NextRequest) {
    try {
        return new NextResponse(JSON.stringify(data), {
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
