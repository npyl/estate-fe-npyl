// INFO: This api route handles mapping of BE api results to how FE expects them

import { IPropertyImage } from "@/types/file";
import { ImagesOrderRes } from "@/types/integrations";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    runtime: "edge",
};

const baseUrl = `${process.env.BACKEND_API_URL}/integrations`;

interface IntegrationImage {
    id: number;
    url: string;
    key: string;
}

interface ImageOrder {
    image: IntegrationImage;
    order: number;
}

// INFO: BE (Backend) sends us this type
interface BEImagesOrderRes {
    publicImages: ImageOrder[];
    privateImages: IntegrationImage[];
}

const IntegrationImageToPropertyImage = (
    image: IntegrationImage
): IPropertyImage => ({
    ...image,
    hidden: true,
    // ...
    thumbnail: false,
    title: "",
    filename: "",
    description: "",
});

const ImageOrderToPropertyImage = ({ image }: ImageOrder) => ({
    ...image,
    hidden: false,
    // ...
    thumbnail: false,
    title: "",
    filename: "",
    description: "",
});

const IntegrationImageToKey = (i?: IntegrationImage) => i?.key || "";

const ImageOrderToKey = (i?: ImageOrder) => IntegrationImageToKey(i?.image);

const BEtoFE = (d?: BEImagesOrderRes): ImagesOrderRes => ({
    publicImages: d?.publicImages?.map(ImageOrderToPropertyImage) || [],
    privateImages: d?.privateImages?.map(IntegrationImageToPropertyImage) || [],
    publicKeys: d?.publicImages?.map(ImageOrderToKey) || [],
    privateKeys: d?.privateImages?.map(IntegrationImageToKey) || [],
});

export default async function handler(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url || "");
        const Authorization = req.headers?.get("Authorization") || "";
        const propertyId = searchParams?.get("propertyId");
        const integrationSite = searchParams?.get("integrationSite");

        if (!propertyId || !integrationSite) {
            return new NextResponse(
                JSON.stringify({ message: "Missing required parameters" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        //
        //  GET
        //
        if (req.method === "GET") {
            const res = await fetch(
                `${baseUrl}/image-order/${propertyId}?integrationSite=${integrationSite}`,
                {
                    headers: {
                        Authorization,
                    },
                }
            );

            if (!res.ok) throw await res.json();

            const data = (await res.json()) as BEImagesOrderRes;

            const final = BEtoFE(data);

            // Convert BE data to how our frontend wants them

            return new NextResponse(JSON.stringify(final), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        //
        //  POST
        //
        if (req.method === "POST") {
            const body = (await req.json()) || [];

            const res = await fetch(
                `${baseUrl}/image-order/${propertyId}?integrationSite=${integrationSite}`,
                {
                    headers: {
                        Authorization,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                    method: "POST",
                }
            );

            if (!res.ok) throw await res.json();

            return new NextResponse(null, {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error(error);

        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
