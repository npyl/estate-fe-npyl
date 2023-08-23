export type LeadSource =
    | "Facebook"
    | "Instagram"
    | "Google"
    | "Customer"
    | "Website"
    | "spitogatos.gr"
    | "plot.gr"
    | "xe.gr"
    | "Street Sign"
    | "Other";

export interface IGlobalPropertyDetails {
    accessibility: string[];
    balconySide: string[];
    electricityType: string[];
    energyClass: string[];
    floorType: string[];
    floors: string[];
    frameType: string[];
    furnished: string[];
    heatingSystem: string[];
    heatingType: string[];
    inclination: string[];
    landUse: string[];
    orientation: string[];
    panelGlassType: string[];
    parkingType: string[];
    viewType: string[];
    zoneType: string[];
}

export interface IGlobalProperty {
    parentCategory: string[];
    category: string[];
    residentialCategory: string[];
    residentialFeatures: string[];
    commercialCategory: string[];
    commercialFeatures: string[];
    landCategory: string[];
    landFeatures: string[];
    otherCategory: string[];
    otherFeatures: string[];
    state: string[];
    details: IGlobalPropertyDetails;
}

export interface IGlobalCustomer {
    leadSource: string[];
    timeframe: string[];
}

export interface IGlobal {
    property: IGlobalProperty;
    customer: IGlobalCustomer;
}
