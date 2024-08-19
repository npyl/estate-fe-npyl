import { PreferredLanguageType } from "./enums";
import { KeyValue } from "./KeyValue";

export type IAgreementType = "BASIC" | "BASIC_EXCLUSIVE" | "PURCHASE";

interface IAgreementOwner {
    fullName: string;
    email: string;
    maidenName: string;
    idCardNumber: string;
    mobilePhone: string;
    vat: string;
    // ...
    city: string;
    street: string;
    number: string;
    // ...
    actingOnMyBehalf: string;
}

export interface IAgreementFormData {
    manager: {
        fullName: string;
        title: string;
        vat: string;
        taxOffice: string;
        genComReg: string; // ΓΕΜΗ
    };
    company: {
        address: string;
        homePhone: string;
        mobilePhone: string;
        email: string;
    };
    owner: IAgreementOwner;
    property: {
        region: string;
        address: string;
        addressNumber: string;
        type: string;
        floor: string;
        livingSpace: string;
        description: string;
        price: string;
    };
    commissionAndDuration: {
        flatRate: string;
        percentage: string;
        months: string;
        defects: string;
    };
    gdpr?: {
        address?: string;
    };
    additional: {
        date: string;
        commissionerSignature: string;
        agentSignature: string;
    };

    suggestedProperties?: {
        area: string;
        address: string;
        type: string;
        livingSpace: string;
        price: string;
        fee: string;
    }[];
}

export interface IAgreement {
    id: number;
    title: string;
    code: string;
    variant: KeyValue<IAgreementType>;
    language: KeyValue<PreferredLanguageType>;
    draft: boolean;
    keys: boolean;
    signed: boolean;

    startingDate: string;
    expirationDate: string;
    availableAfter: string;

    property: {
        id: number;
        code: string;
    };
    owner: {
        id: number;
        name: string;
    };

    // ... Form Data ...
    formData: IAgreementFormData;
}

export interface IAgreementShort {
    id: number;
    code: string;
    variant: KeyValue<IAgreementType>;
    language: KeyValue<PreferredLanguageType>;
    draft: boolean;
    keys: boolean;
    title: string;

    startingDate: string;
    expirationDate: string;
    availableAfter: string;

    property: {
        id: number;
        code: string;
    };
    owner: {
        id: number;
        name: string;
    };
}

// Take parts from IAgreement and IAgreementFormData
type IAgreementReqBase = Omit<IAgreementFormData, "owner"> &
    Omit<
        IAgreement,
        | "id"
        | "property"
        | "code"
        | "owner"
        | "variant"
        | "language"
        | "formData"
    >;

export interface IAgreementReq extends IAgreementReqBase {
    id?: number;
    propertyId?: number; // undefined for "PURCHASE"
    ownerId: number;

    owner: IAgreementOwner;
    variant: IAgreementType;
    language: PreferredLanguageType;

    // NOTE: must not be sent to BE;
    //       they are automatically filled
    //       (required only when generating a PDF)
    auto: {
        gdprEmail: string;
        day: number;
        month: number;
        year: number;
    };
}

export interface IAgreementPDFReq {
    variant: IAgreementType;
    lang: "en" | "el";
}

export interface IAgreementsFilters {
    variants: IAgreementType[] | null;
    active: boolean | null;
    draft: boolean | null;
    keys: boolean | null;
    signed: boolean | null;
    expiresBy: string | null;

    propertyId?: number;
    customerId?: number;

    [key: string]: any;
}
