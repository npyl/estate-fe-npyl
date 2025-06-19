import { IntegrationSite } from "@/types/integrations";

interface GetImagesOrderReq {
    propertyId: number;
    integrationSite: IntegrationSite;
}
interface UpdateImagesOrderReq extends GetImagesOrderReq {
    propertyImages: string[]; // keys
}

export type { GetImagesOrderReq, UpdateImagesOrderReq };
