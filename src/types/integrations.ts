import { IPropertyImage } from "./file";
import { IntegrationSite } from "./listings";

interface ImagesOrderRes {
    publicImages: IPropertyImage[];
    privateImages: IPropertyImage[];

    publicKeys: string[];
    privateKeys: string[];
}

export interface IIntegration {
    apiKey: string;
    appKey: string;
    password: string;
    site: IntegrationSite;
    username: string;

    // INFO: only for RightMove
    branchId: number;
}

export interface IIntegrationPOST extends Partial<IIntegration> {}

export type { ImagesOrderRes };
