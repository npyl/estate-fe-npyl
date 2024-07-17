import { TLanguageType } from "./translation";

export type IAgreementType = "basic" | "basic_exclusive" | "purchase";

export interface IAgreement {
    id: number;
    assignedProperty: {
        id: number;
        code: string;
    };
    // ...
    variant: IAgreementType;
    lang: TLanguageType;
    draft: boolean;
    keys: boolean;
    title: string;
    startingDate: string;
    expirationDate: string;
    availableAfter: string;
    // ... Form Data ...
    manager: {
        fullname: string;
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
    owner: {
        fullname: string;
        email: string;
        maidenName: string;
        idCardNo: string;
        mobilePhone: string;
        vat: string;
        // ...
        city: string;
        street: string;
        number: string;
        // ...
        actingOnMyBehalfFiller: string;
    };
    property: {
        region: string;
        address: string;
        addressNo: string;
        type: string;
        floor: number;
        livingSpace: number;
        description: string;
        price: number;
    };
    commissionAndDuration: {
        payment: number;
        flatRate: number;
        percentage: number;
        months: number;
        defects: string;
    };
    gdpr?: {
        email?: string;
        address?: string;
    };
    additional: {
        date: string;
        commisionerSignature: string;
        agentSignature: string;
    };
}

export interface IAgreementReq
    extends Omit<IAgreement, "id" | "assignedProperty"> {
    id?: number;
    propertyId: number;
}

export interface IAgreementPDFReq {
    variant: IAgreementType;
    lang: "en" | "el";
}

export interface IAgreementsFilters {
    type: IAgreementType | null;
    active: boolean | null;
    draft: boolean | null;
    keys: boolean | null;
    signed: boolean | null;
    expirationDate: string;

    propertyId?: number;
    customerId?: number;

    [key: string]: any;
}
