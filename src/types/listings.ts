export type Listings = Record<ListingTypes, boolean>;
export type ListingTypes =
    | "SPITOGATOS"
    | "PLOT_GR"
    | "JAMES_EDITION"
    | "XE"
    | "RIGHT_MOVE"
    | "FERIMMO";

// INFO: for now, an IListing is only an IPublicSite (will change on rework)

interface IListing {
    integrationSite: ListingTypes;
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
