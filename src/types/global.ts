export interface IGlobalPropertyDetails {
    accessibility: string[];
    balconySide: string[];
    electricityType: string[];
    energyClass: string[];
    floorType: string[];
    frameType: string[];
    furnished: string[];
    heatingSystem: string[];
    heatingType: string[];
    orientation: string[];
    parkingType: string[];
    viewType: string[];
    zoneType: string[];
}

export interface IGlobalProperty {
    category: string[];
    state: string[];
    details: IGlobalPropertyDetails;
}

export interface IGlobal {
    property: IGlobalProperty;
}