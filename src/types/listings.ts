import { IntegrationSite } from "./integrations";

export type Listings = Record<IntegrationSite, boolean>;

// INFO: for now, an IListing is only an IPublicSite (will change on rework)

interface IListing {
    integrationSite: IntegrationSite;
    publicSite: {
        id: number;
        siteUrl: string;
    };
    published: boolean;
}

export interface IListings {
    publicSites: IListing[];
    integrations: IListing[];
}
