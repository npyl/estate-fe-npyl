export type Listings = Record<ListingTypes, boolean>;
export type ListingTypes =
    | "PUBLIC_SITE"
    | "SPITOGATOS"
    | "PLOTGR"
    | "JAMES_EDITION"
    | "XRYSH_EUKAIRIA"
    | "RIGHTMOVE"
    | "FERIMMO";

// INFO: for now, an IListing is only an IPublicSite (will change on rework)

interface IListing {
    publicSite: {
        id: number;
        siteUrl: string;
    };
    published: boolean;
}

export interface IListings {
    publicSites: IListing[];
}
