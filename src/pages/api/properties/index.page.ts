import { IPropertyReq } from "@/types/properties";
import isFalsy from "@/utils/isFalsy";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = `${process.env.BACKEND_API_URL}/property`;

const propertyUrl = `${baseUrl}/edit`;

const getPdfUrl = (propertyId: number) => {
    const url = `${baseUrl}/${propertyId}/generate-export`;

    // INFO: qrPath is still required to be passed but BE is handling it so we just pass an empty value
    const urlWithParams = new URL(url);
    urlWithParams.searchParams.append("qrPath", "");

    return urlWithParams.toString();
};

export const config = {
    runtime: "edge",
};

export default async function handler(req: NextRequest) {
    try {
        if (req.method !== "PUT") throw "Bad method";

        const Authorization = req.headers?.get("Authorization") || "";
        if (!Authorization) throw "Bad token";

        const { id, generate, ...body } = (await req.json()) as IPropertyReq;
        if (isFalsy(id)) throw "Bad id";

        //
        // Edit Property
        //
        const res0 = await fetch(`${propertyUrl}/${id}`, {
            headers: {
                Authorization,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            method: "POST",
        });

        if (!res0.ok) throw await res0.json();

        //
        // Generate PDF
        //
        if (generate) {
            const url = getPdfUrl(id!);

            const res1 = await fetch(url, {
                headers: {
                    Authorization,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(body),
            });

            if (!res1.ok) throw await res1.json();
        }

        return new NextResponse(JSON.stringify({}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (ex) {
        // console.error(ex);

        return new NextResponse(JSON.stringify(ex), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
