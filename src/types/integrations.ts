import { IPropertyImage } from "./file";

type IntegrationSite =
    | "SPITOGATOS"
    | "PLOT_GR"
    | "JAMES_EDITION"
    | "XE"
    | "RIGHT_MOVE"
    | "FERIMMO";

interface IIntegration {
    id: IntegrationSite;
    name: string;
}

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
    IntegrationSite,
    IIntegration,
    // ...
    ImagesOrderRes,
    // ...
    IIntegrationCredentials,
    IIntegrationCredentialsPOST,
};
