import { IAgreement, IAgreementReq, IAgreementType } from "@/types/agreements";
import * as yup from "yup";
import dayjs from "dayjs";
import { TLanguageType } from "@/types/translation";

const EmptySchema = yup.object().shape({});

const FullSchema = yup.object<IAgreementReq>().shape({
    id: yup.number().moreThan(0).optional(),
    propertyId: yup
        .number()
        .moreThan(0, "Please make sure to select a property!")
        .required("Please make sure to select a property!"),
    ownerId: yup
        .number()
        .moreThan(0, "Please make sure to select a property!")
        .required("Please make sure to select a property!"),

    variant: yup
        .string()
        .oneOf<IAgreementType>(["basic", "basic_exclusive", "purchase"])
        .required(),
    lang: yup.string().oneOf<TLanguageType>(["en", "el"]).required(),
    draft: yup.boolean().required(),
    keys: yup.boolean().required(),
    signed: yup.boolean().required(),
    title: yup.string().required(),
    startingDate: yup.string().required(),
    expirationDate: yup.string().required(),
    availableAfter: yup.string().required(),
    // ...
    manager: yup.object({
        fullName: yup.string().required(),
        title: yup.string().required(),
        vat: yup.string().required(),
        taxOffice: yup.string().required(),
        genComReg: yup.string().required(), // ΓΕΜΗ
    }),
    company: yup.object({
        address: yup.string().required(),
        homePhone: yup.string().required(),
        mobilePhone: yup.string().required(),
        email: yup.string().required(),
    }),
    owner: yup.object({
        fullName: yup.string().required(),
        email: yup.string().required(),
        maidenName: yup.string().required(),
        idCardNumber: yup.string().required(),
        mobilePhone: yup.string().required(),
        vat: yup.string().required(),
        // ...
        city: yup.string().required(),
        street: yup.string().required(),
        number: yup.string().required(),
        // ...
        actingOnMyBehalf: yup.string().required(),
    }),
    property: yup.object({
        region: yup.string().required(),
        address: yup.string().required(),
        addressNumber: yup.string().required(),
        type: yup.string().required(),
        floor: yup.string().required(),
        livingSpace: yup.string().required(),
        description: yup.string().required(),
        price: yup.string().required(),
    }),
    commissionAndDuration: yup.object({
        payment: yup.string().required(),
        flatRate: yup.string().required(),
        percentage: yup.string().required(),
        months: yup.string().required(),
        defects: yup.string().required(),
    }),
    gdpr: yup
        .object({
            email: yup.string().email().optional(),
            address: yup.string().optional(),
        })
        .optional(),
    additional: yup.object({
        date: yup.string().required(),
        commisionerSignature: yup.string().required(),
        agentSignature: yup.string().required(),
    }),
});

const Schema = yup.object<IAgreementReq>().when("draft", {
    is: true,
    then: () => EmptySchema,
    otherwise: () => FullSchema,
});

export const getValues = (
    isCustomer: boolean,
    agreement?: IAgreement
): IAgreementReq => {
    const {
        id,
        assignedProperty,
        variant,
        lang,
        draft,
        keys,
        title,
        startingDate,
        expirationDate,
        availableAfter,
        gdpr,
        manager,
        company,
        commissionAndDuration,
        additional,
        owner,
        property,
        suggestedProperties,
    } = agreement || {};

    const { id: propertyId } = assignedProperty || {};

    return {
        id,
        propertyId: propertyId || -1,
        // ...
        variant: isCustomer ? "basic_exclusive" : variant || "basic",
        lang: lang || "el",
        draft: draft || false,
        keys: keys || false,
        title: title || "",
        startingDate: startingDate || dayjs().toISOString(),
        // Initial value (12 months ahead from today)
        expirationDate:
            expirationDate || dayjs().add(12, "month").toISOString(),
        availableAfter: availableAfter || dayjs().toISOString(),
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
            percentage: commissionAndDuration?.percentage || "",
            months: commissionAndDuration?.months || "",
            defects: commissionAndDuration?.defects || "",
        },
        gdpr,
        additional: {
            date: additional?.date || "",
            commisionerSignature: additional?.commisionerSignature || "",
            agentSignature: additional?.agentSignature || "",
        },

        onwerId: owner?.id || -1,

        suggestedProperties: suggestedProperties,

        signed:
            !!additional?.commisionerSignature &&
            !!additional.commisionerSignature,
    };
};

export default Schema;
