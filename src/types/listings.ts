import { IntegrationSite } from "./integrations";

type Listings = Record<IntegrationSite, boolean>;

// INFO: for now, an IListing is only an IPublicSite (will change on rework)

interface IListing {
    integrationSite: IntegrationSite;
    publicSite: {
        id: number;
        siteUrl: string;
    };
    published: boolean;
}

interface IListings {
    publicSites: IListing[];
    integrations: IListing[];
}

export type {
    Listings,
    // ...
    IListing,
    IListings,
};
