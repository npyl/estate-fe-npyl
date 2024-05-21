export interface IIntegration {
    map: any;
    apiKey: string;
    appKey: string;
    password: string;
    site: string;
    username: string;
}

export interface IIntegrationsPOST extends IIntegration {}
