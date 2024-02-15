import { ILocation } from "./location";

export interface ContactNotificationPOST {
    customerName?: string;
    customerEmail?: string;
    customerMobile?: string;
    message?: string;

    propertyCode?: string;
    tourDate?: string;
    tourTime?: string;
    tourType?: string;
}

export type NotificationType = "listing" | "contact" | "tour";

export interface ContactNotification {
    id?: number;

    customerName: string;
    customerEmail: string;
    customerMobile: string;
    message: string;

    propertyCode: string;
    tourDate: string;
    tourTime: string;
    tourType: string;

    notificationDate: string;
    viewed: boolean;

    notificationType: NotificationType;
}

export interface ContactNotificationExtended extends ContactNotification {
    listingDetails: ListingNotification;
}

export interface IListingLocation extends Omit<ILocation, "locationDisplay"> {}

// response
export interface ListingNotification {
    fullName: string;
    email: string;
    mobilePhone: string;

    category: string;
    parentCategory: string;
    state: string;
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
