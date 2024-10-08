import { KeyValue } from "./KeyValue";

export type LeadSource =
    | "FACEBOOK"
    | "INSTAGRAM"
    | "GOOGLE"
    | "CUSTOMER"
    | "WEBSITE"
    | "SPITOGATOS_GR"
    | "PLOT_GR"
    | "XE_GR"
    | "STREET_SIGN"
    | "OTHER";

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

export interface IDescriptionImprovement {
    key: string;
    value: string;
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
    descriptionImprovementOptions: IDescriptionImprovement[];
}

export interface IGlobalCustomer {
    leadSource: KeyValue[];
    timeframe: KeyValue[];
    nationality: KeyValue[];
}
export interface IGlobalLog {
    resourceTypes: KeyValue[];
    userActions: KeyValue[];
}
export interface IGlobal {
    property: IGlobalProperty;
    customer: IGlobalCustomer;
    logs: IGlobalLog;
}
