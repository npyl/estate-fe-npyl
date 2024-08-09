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
    // | "CONTACT"
    | "TOUR"
    | "WORK_FOR_US"
    | "REVIEW"
    | "AGREEMENT";

interface IPropertyLocation {
    street: string;
    number: string;
    city: string;
    region: string;
}

export interface IPropertyForNotification {
    id: number;
    code: string;
    category: KeyValue;
    state: KeyValue;
    area: number;
    price: number;
    thumbnail: string;
    regionEN: string;
    regionGR: string;
    complexEN: string;
    complexGR: string;
    cityEN: string;
    cityGR: string;
    country: string;
    street: string;
    number: string;
    descriptions?: IPropertyDescriptionsForNotification;
    type: KeyValue;
}

interface DescriptionType {
    title: string;
    desription: string;
}
export interface IPropertyDescriptionsForNotification {
    el: DescriptionType;
    en: DescriptionType;
}

export interface ContactNotification {
    id?: number;
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
    property?: IPropertyForNotification;
    descriptions?: IPropertyDescriptionsForNotification;
    type: KeyValue;
    reviewDetails: ReviewDetails;
    agreement?: AgreementDetails;
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
    agreementDetails: AgreementDetails;
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

interface OwnerAgreement {
    id: number;
    name: string;
}

interface PropertyAgreement {
    code: string;
    id: number;
}
export interface AgreementDetails {
    active: boolean;
    code: string;
    expirationDate: string;
    expiredToday: boolean;
    expiresSoon: boolean;
    id: number;
    owner: OwnerAgreement;
    property: PropertyAgreement;
    title: string;
    variant: KeyValue;
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
    agreementDetails: AgreementDetails;
}
