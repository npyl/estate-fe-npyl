import { PreferredLanguageType } from "./enums";
import { KeyValue } from "./KeyValue";

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

interface IAgreementFormData {
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

export interface IAgreement {
    id: number;
    title: string;
    code: string;
    // ...
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

    // ... Form Data ...
    formData: IAgreementFormData;
}

// unused:
// owner: {
//     id: number;
//     name: string;
// };

export interface IAgreementShort {
    id: number;
    code: string;
    property: {
        id: number;
        code: string;
    };
    // ...
    variant: KeyValue<IAgreementType>;
    language: KeyValue<PreferredLanguageType>;
    draft: boolean;
    keys: boolean;
    title: string;

    startingDate: string;
    expirationDate: string;
    availableAfter: string;

    owner: {
        id: number;
        name: string;
    };
}

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
    propertyId: number;
    ownerId: number;

    owner: Omit<IAgreementOwner, "id">;
    variant: IAgreementType;
    language: PreferredLanguageType;
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
