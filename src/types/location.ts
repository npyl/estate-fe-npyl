import { KeyValue } from "./KeyValue";
import { LocationDisplay } from "./enums";

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
    locationDisplay: KeyValue;
}

export interface ILocationPOST {
    street: string;
    number: string;
    zipCode?: number;
    complex: string; // shown as: neighbourhood
    city: string; // shown as: municipality
    region: string;
    country: string;
    lat?: number;
    lng?: number;
    locationDisplay: LocationDisplay;
}
