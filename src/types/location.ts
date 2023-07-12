export interface ILocation {
  street: string;
  number: string;
  complex: string;
  zipCode: number;
  city: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
}

export interface ILocationPOST {
  street: string;
  number: string;
  complex: string;
  zipCode?: number;
  city: string;
  region: string;
  country: string;
}
