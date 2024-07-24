import { TLanguageType } from "./translation";

export type IAgreementType = "BASIC" | "BASIC_EXCLUSIVE" | "PURCHASE";

interface IAgreementOwner {
    id: number;
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

export interface IAgreement {
    id: number;
    code: string;
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
        payment: string;
        flatRate: string;
        percentage: string;
        months: string;
        defects: string;
    };
    gdpr?: {
        // TODO: this
        email?: string;
        address?: string;
    };
    additional: {
        date: string;
        commisionerSignature: string;
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

export interface IAgreementReq
    extends Omit<IAgreement, "id" | "assignedProperty" | "code" | "owner"> {
    id?: number;
    propertyId: number;
    onwerId: number;

    owner: Omit<IAgreementOwner, "id">;

    // NOTE: BE requires this
    // true when there is commisionerSignature *AND* agentSignature
    signed: boolean;
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
