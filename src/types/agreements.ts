interface IPurchaseAgreement {
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
        area: number;
        address: string;
        addressNo: string;
        type: string;
        floor: number;
        livingSpace: number;
        description: string;
        price: number;
    };
    commissionAndDuration: {
        flatRate: number;
        percentage: number;
        months: number;
        defects: string;
    };
    gdpr: boolean;
}

interface IBasicAgreement {}

type IAgreement = (IBasicAgreement | IPurchaseAgreement) & {
    additional: {
        date: string;
        commisionerSignature: string;
        agentSignature: string;
    };
};
