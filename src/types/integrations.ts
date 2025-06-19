import { IPropertyImage } from "./file";
import { IntegrationSite } from "./listings";

interface ImagesOrderRes {
    publicImages: IPropertyImage[];
    privateImages: IPropertyImage[];

    publicKeys: string[];
    privateKeys: string[];
}

interface IIntegrationCredentials {
    apiKey: string;
    appKey: string;
    password: string;
    site: IntegrationSite;
    username: string;

    // INFO: only for RightMove
    branchId: number;
}

interface IIntegrationCredentialsPOST
    extends Partial<IIntegrationCredentials> {}

export type {
    ImagesOrderRes,
    // ...
    IIntegrationCredentials,
    IIntegrationCredentialsPOST,
};
