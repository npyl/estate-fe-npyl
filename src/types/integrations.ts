export interface IIntegration {
    apiKey: string;
    appKey: string;
    password: string;
    site: string;
    username: string;
}

export interface IIntegrationPOST extends IIntegration {}
