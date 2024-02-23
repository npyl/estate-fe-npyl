import { KeyValue } from "../KeyValue";
import { ILocation } from "../location";

export interface IListingLocation extends Omit<ILocation, "locationDisplay"> {}

// response
export interface ListingNotification {
    fullName: string;
    email: string;
    mobilePhone: string;

    category: KeyValue;
    parentCategory: KeyValue;
    state: KeyValue;
    title: string;
    description: string;

    location: IListingLocation;

    area: number;
    bedrooms: number;
    bathrooms: number;
    floors: number;

    price: number;

    photo: string;
}
