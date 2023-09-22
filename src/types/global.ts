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
    accessibility: KeyValue[];
    balconySide: KeyValue[];
    electricityType: KeyValue[];
    energyClass: KeyValue[];
    floorType: KeyValue[];
    floors: KeyValue[];
    frameType: KeyValue[];
    furnished: KeyValue[];
    heatingSystem: KeyValue[];
    heatingType: KeyValue[];
    inclination: KeyValue[];
    landUse: KeyValue[];
    orientation: KeyValue[];
    panelGlassType: KeyValue[];
    parkingType: KeyValue[];
    viewType: KeyValue[];
    zoneType: KeyValue[];
}

export interface IGlobalProperty {
    parentCategory: KeyValue[];
    category: KeyValue[];
    residentialCategory: KeyValue[];
    residentialFeatures: KeyValue[];
    commercialCategory: KeyValue[];
    commercialFeatures: KeyValue[];
    landCategory: KeyValue[];
    landFeatures: KeyValue[];
    otherCategory: KeyValue[];
    otherFeatures: KeyValue[];
    state: KeyValue[];
    details: IGlobalPropertyDetails;
}
interface KeyValue {
    key: string;
    value: string;
}
export interface IGlobalCustomer {
    leadSource: KeyValue[];
    timeframe: KeyValue[];
    nationality: KeyValue[];
}

export interface IGlobal {
    property: IGlobalProperty;
    customer: IGlobalCustomer;
}
