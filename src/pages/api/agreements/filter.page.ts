import { NextRequest, NextResponse } from "next/server";
import fakeData from "./constants";

export const config = {
    runtime: "edge",
};

const makePage = <T extends any[]>(data: T) => ({
    content: data,
    totalElements: data.length,
});

export default async function POST(req: NextRequest) {
    try {
        return new NextResponse(JSON.stringify(makePage(fakeData)), {
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
