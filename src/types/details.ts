import { KeyValue } from "./KeyValue";

export interface IPropertyDetailsParking {
    parkingType: KeyValue;
    spots: number;
}
export interface IPropertyDetailsBalcony {
    side: KeyValue;
    area: number;
}

export interface IPropertyDetailsParkingPOST {
    parkingType: string;
    spots: number;
}
export interface IPropertyDetailsBalconyPOST {
    side: string;
    area: number;
}

export interface IPropertyDetailsPOST {
    floor?: string;
    bedrooms?: number;
    kitchens?: number;
    wc?: number;
    layers?: number;
    livingrooms?: number;
    bathrooms?: number;
    rooms?: number;
    attic?: boolean;
    storeroom?: boolean;
    playroom?: boolean;
    floorApartment?: boolean;
    penthouse?: boolean;
    orientation?: string;
    viewType?: string;
    accessibility?: string;
    landUse?: string;
    zoneType?: string;
    parkings: IPropertyDetailsParkingPOST[];
    balconies: IPropertyDetailsBalconyPOST[];
}

export interface IPropertyDetails {
    floor: KeyValue;
    bedrooms: number;
    kitchens: number;
    wc: number;
    layers: number;
    livingrooms: number;
    bathrooms: number;
    rooms: number;
    attic: boolean;
    storeroom: boolean;
    playroom: boolean;
    floorApartment: boolean;
    penthouse: boolean;
    orientation: KeyValue;
    viewType: KeyValue;
    accessibility: KeyValue;
    landUse: KeyValue;
    zoneType: KeyValue;
    parkings: IPropertyDetailsParking[];
    balconies: IPropertyDetailsBalcony[];
}
