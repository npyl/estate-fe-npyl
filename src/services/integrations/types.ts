import { IntegrationSite } from "@/types/listings";

interface ImagesOrderRes {
    image: {
        id: number;
        url: string;
    };
    order: number;
}

interface GetImagesOrderReq {
    propertyId: number;
    integrationSite: IntegrationSite;
}
interface UpdateImagesOrderReq extends GetImagesOrderReq {
    propertyImages: number[]; // ids
}

export type { ImagesOrderRes, GetImagesOrderReq, UpdateImagesOrderReq };
