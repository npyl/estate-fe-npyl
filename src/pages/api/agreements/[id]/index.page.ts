import { NextRequest, NextResponse } from "next/server";
import fakeData from "../constants";

export const config = {
    runtime: "edge",
};

export default async function GET(req: NextRequest) {
    try {
        return new NextResponse(JSON.stringify(fakeData[0]), {
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
