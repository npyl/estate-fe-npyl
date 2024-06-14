import { IntegrationSite } from "./listings";

export interface IIntegration {
    apiKey: string;
    appKey: string;
    password: string;
    site: IntegrationSite;
    username: string;
}

export interface IIntegrationPOST extends IIntegration {}
