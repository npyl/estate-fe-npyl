import { IPropertyImage } from "@/types/file";
import { IntegrationSite } from "@/types/listings";

interface ImagesOrderRes {
    publicImages: IPropertyImage[];
    privateImages: IPropertyImage[];

    publicKeys: string[];
    privateKeys: string[];
}

interface GetImagesOrderReq {
    propertyId: number;
    integrationSite: IntegrationSite;
}
interface UpdateImagesOrderReq extends GetImagesOrderReq {
    propertyImages: string[]; // keys
}

export type { ImagesOrderRes, GetImagesOrderReq, UpdateImagesOrderReq };
