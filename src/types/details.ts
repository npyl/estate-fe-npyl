export interface IPropertyDetailsParking {
  parkingType: string;
  spots: number;
}
export interface IPropertyDetailsBalcony {
  side: string;
  area: number;
}

export interface IPropertyDetails {
  floor: string;
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
  orientation: string;
  viewType: string;
  accessibility: string;
  landUse: string;
  zoneType: string;
  parkings: IPropertyDetailsParking[];
  balconies: IPropertyDetailsBalcony[];
}
