export interface IPropertyDetailsParking {
  parkingType: string;
  spots: number;
}
export interface IPropertyDetailsBalcony {
  side: string;
  area: number;
}
export interface IPropertyDetailsHeating {
  heatingType: string;
  heatingSystem: string;
  floorHeating: boolean;
  airConditioning: boolean;
}
export interface IPropertyDetailsDistance {
  toPublicTransport: number;
  toSea: number;
}
export interface IPropertyDetailsAreas {
  plot: number;
  covered: number;
  basement: number;
  attic: number;
  garden: number;
  balconies: number;
}

export interface IPropertyDetails {
  id: number;
  floor: number;
  layers: number;
  bedrooms: number;
  kitchens: number;
  bathrooms: number;
  storerooms: number;
  livingRooms: number;
  numOfWC: number;
  floorType: string;
  frameType: string;
  energyClass: string;
  furnished: string;
  parkings: IPropertyDetailsParking[];
  balconies: IPropertyDetailsBalcony[];
  constructionYear: number;
  renovationYear: number;
  avgUtils: number;
  heating: IPropertyDetailsHeating;
  distance: IPropertyDetailsDistance;
  areas: IPropertyDetailsAreas;
  orientation: string;
  view: string;
  accessibility: string;
  zoneType: string;
  propertyArea: number;
  electricityType: string;
}
