export interface ICompany {
    companyName: string;
    address: string;
    city: string;
    email: string;
    fixedTelephones: string[];
    phoneNumbers: string[];
    description: string;

    facebook: string;
    googlePlus: string;
    instagram: string;
    linkedIn: string;
    skype: string;
    tiktok: string;
    twitter: string;
    youtube: string;

    includeWatermark: boolean;

    watermarkPosition:
        | "CENTER"
        | "DOWN_RIGHT"
        | "DOWN_CENTER"
        | "DOWN_LEFT"
        | "UP_RIGHT"
        | "UP_CENTER"
        | "UP_LEFT";
}

export interface ICompanyPOST
    extends Omit<
        ICompany,
        | "facebook"
        | "googlePlus"
        | "instagram"
        | "linkedIn"
        | "skype"
        | "tiktok"
        | "twitter"
        | "youtube"
        | "includeWatermark"
    > {
    facebook?: string;
    googlePlus?: string;
    instagram?: string;
    linkedIn?: string;
    skype?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;

    includeWatermark?: boolean;
}
