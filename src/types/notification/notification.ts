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
    | "listing"
    | "contact"
    | "tour"
    | "workForUs"
    | "review";

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

interface ReviewDetails {
    comment?: string;
    email: string;
    id?: number;
    name: string;
    presentationRating?: number;
    propertyRating?: number;
    source?: string;
}
export interface ContactNotificationExtended extends ContactNotification {
    listingDetails: ListingNotification;
    workForUsDetails: IWorkForUs;
    reviewDetails: ReviewDetails;
}
