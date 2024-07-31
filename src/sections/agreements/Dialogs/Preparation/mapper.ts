import { IAgreement, IAgreementReq } from "@/types/agreements";
import { TLanguageType } from "@/types/translation";
import toLocalDate from "@/utils/toLocalDate";
import dayjs from "dayjs";

const MANAGER = {
    en: {
        fullName: "Mr. Georgios A. Kopanitsanos",
        title: "BA Business & Economics, MA Real estate and Valuatons, Certfied Real Estate Agent & Broker, University Graduate Valuer",
        vat: "052288603",
        taxOffice: "A'PATRAS",
        genComReg: "035223316000", // ΓΕΜΗ
    },
    el: {
        fullName: "τον κ. Γεώργιο Αγαμ. Κοπανιτσάνο",
        title: "Οικονομολόγο, MA Real Estate & Valua�ons, Μεσίτη Αστικών Συμβάσεων, Πτυχ. Εκτιμητή Ακινήτων",
        vat: "052288603",
        taxOffice: "A'ΠΑΤΡΩΝ",
        genComReg: "035223316000", // ΓΕΜΗ
    },
};

const COMPANY = {
    en: {
        address: "3 King George's Square No.3, Patras, Greece",
        homePhone: "2610.621.200",
        mobilePhone: "6946.184.15",
        email: "kopanitsanosgiorgos@gmail.com, giorgos@kopanitsanos.gr",
    },
    el: {
        address: "Εμπορικό Κέντρο “ΚΟΛΛΑ”– Πλ. Γεωργίου A' 3, Πάτρα",
        homePhone: "2610.621.200",
        mobilePhone: "6946.184.15",
        email: "kopanitsanosgiorgos@gmail.com",
    },
};

export const getValues = (
    isCustomer: boolean,
    agreement: IAgreement | undefined,
    lang: TLanguageType
): IAgreementReq => {
    const {
        id,
        property: assignedProperty,
        owner: assignedOwner,
        formData,
        variant,
        language,
        draft,
        keys,
        title,
        startingDate,
        expirationDate,
        availableAfter,
    } = agreement || {};

    const {
        gdpr,
        commissionAndDuration,
        additional,
        owner,
        property,
        suggestedProperties,
    } = formData || {};

    const { id: propertyId } = assignedProperty || {};
    const { id: ownerId } = assignedOwner || {};

    const manager = MANAGER[lang];
    const company = COMPANY[lang];

    return {
        id,
        propertyId: propertyId || -1,
        ownerId: ownerId || -1,
        // ...
        variant: isCustomer ? "BASIC_EXCLUSIVE" : variant?.key || "BASIC",
        language: language?.key || "GREEK",
        draft: draft || false,
        keys: keys || false,
        title: title || "",
        startingDate: startingDate || toLocalDate(dayjs().toISOString()),
        // Initial value (12 months ahead from today)
        expirationDate:
            expirationDate ||
            toLocalDate(dayjs().add(12, "month").toISOString()),
        availableAfter: availableAfter || toLocalDate(dayjs().toISOString()),
        // ...
        manager: {
            fullName: manager?.fullName || "",
            title: manager?.title || "",
            vat: manager?.vat || "",
            taxOffice: manager?.taxOffice || "",
            genComReg: manager?.genComReg || "", // ΓΕΜΗ
        },
        company: {
            address: company?.address || "",
            homePhone: company?.homePhone || "",
            mobilePhone: company?.mobilePhone || "",
            email: company?.email || "",
        },
        owner: {
            fullName: owner?.fullName || "",
            email: owner?.email || "",
            maidenName: owner?.maidenName || "",
            idCardNumber: owner?.idCardNumber || "",
            mobilePhone: owner?.mobilePhone || "",
            vat: owner?.vat || "",
            // ...
            city: owner?.city || "",
            street: owner?.street || "",
            number: owner?.number || "",
            // ...
            actingOnMyBehalf: owner?.actingOnMyBehalf || "",
        },
        property: {
            region: property?.region || "",
            address: property?.address || "",
            addressNumber: property?.addressNumber || "",
            type: property?.type || "",
            floor: property?.floor || "",
            livingSpace: property?.livingSpace || "",
            description: property?.description || "",
            price: property?.price || "",
        },
        commissionAndDuration: {
            payment: commissionAndDuration?.payment || "",
            flatRate: commissionAndDuration?.flatRate || "",
            percentage: commissionAndDuration?.percentage || "2%",
            months: commissionAndDuration?.months || "12",
            defects: commissionAndDuration?.defects || "",
        },
        gdpr: {
            address: gdpr?.address || "",
        },
        additional: {
            date: additional?.date || toLocalDate(dayjs().toISOString()),
            commissionerSignature: additional?.commissionerSignature || "",
            agentSignature: additional?.agentSignature || "",
        },

        suggestedProperties: suggestedProperties,

        signed:
            !!additional?.commissionerSignature && !!additional.agentSignature,

        auto: {
            gdprEmail: "",
            day: -1,
            month: -1,
            year: -1,
        },
    };
};
