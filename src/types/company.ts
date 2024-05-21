export interface ICompany {
    address: string;
    city: string;
    website: string;
    companyName: string;
    description: string;
    email: string;
    facebook: string;
    fixedTelephones: string[];
    googlePlus: string;
    includeWatermark: boolean;
    instagram: string;
    linkedIn: string;
    phoneNumbers: string[];
    skype: string;
    tiktok: string;
    twitter: string;
    watermarkPosition:
        | "CENTER"
        | "DOWN_RIGHT"
        | "DOWN_CENTER"
        | "DOWN_LEFT"
        | "UP_RIGHT"
        | "UP_CENTER"
        | "UP_LEFT";
    youtube: string;
}

export interface ICompanyPOST extends ICompany {}
