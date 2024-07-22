import { IPropertyImage } from "../file";
import { KeyValue } from "../KeyValue";
import { ListingNotification } from "./listing";
import IWorkForUs from "./workForUs";

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

export type NotificationType =
    | "LISTING"
    | "CONTACT"
    | "TOUR"
    | "WORK_FOR_US"
    | "REVIEW";

interface IPropertyLocation {
    street: string;
    number: string;
    city: string;
    region: string;
}
export interface ContactNotification {
    id?: number;
    propertyId: number;
    propertyImage: IPropertyImage;
    location: IPropertyLocation;
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

export interface INotificationResponse {
    customerEmail: string;
    customerMobile: string;
    customerName: string;
    id?: number;
    listingDetails: ListingNotification;
    message: string;
    notificationDate: string;
    notificationType: NotificationType;
    propertyCode: string;
    reviewDetails: ReviewDetails;
    tourDate: string;
    tourTime: string;
    tourType: string;
    type: KeyValue;
    viewed: boolean;
    workForUsDetails: IWorkForUs;
    propertyImage: IPropertyImage;
    location: IPropertyLocation;
    propertyId: number;
}

export interface INotificationFilter {
    types: NotificationType[];
    viewed?: boolean;
}

interface ReviewDetails {
    comment?: string;
    email: string;
    id?: number;
    name: string;
    presentationRating?: number;
    propertyRating?: number;
    source?: string;
}

export interface NotViewedContactNotifications {
    total: number;
    types: {
        [key: string]: number;
    };
}
export interface ContactNotificationExtended extends ContactNotification {
    listingDetails: ListingNotification;
    workForUsDetails: IWorkForUs;
    reviewDetails: ReviewDetails;
}
