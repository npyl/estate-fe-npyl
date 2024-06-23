import { IAgreement, IAgreementReq } from "@/types/agreements";
import * as yup from "yup";
import { lazy } from "react";
import dayjs from "dayjs";
const PDFEditorDialog = lazy(() => import("../PDFEditor"));

const Schema = yup.object<IAgreementReq>().shape({
    variant: yup.string().oneOf(["basic", "purchase"]).required(),
    draft: yup.boolean().required(),
    keys: yup.boolean().required(),
    title: yup.string().required(),
    startingDate: yup.string().required(),
    expirationDate: yup.string().required(),
    availableAfter: yup.string().required(),
    // ...
    manager: yup.object({
        fullname: yup.string().required(),
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
        fullname: yup.string().required(),
        email: yup.string().required(),
        maidenName: yup.string().required(),
        idCardNo: yup.string().required(),
        mobilePhone: yup.string().required(),
        vat: yup.string().required(),
        // ...
        city: yup.string().required(),
        street: yup.string().required(),
        number: yup.string().required(),
        // ...
        actingOnMyBehalfFiller: yup.string().required(),
    }),
    property: yup.object({
        area: yup.number().required(),
        address: yup.string().required(),
        addressNo: yup.string().required(),
        type: yup.string().required(),
        floor: yup.number().required(),
        livingSpace: yup.number().required(),
        description: yup.string().required(),
        price: yup.number().required(),
    }),
    commissionAndDuration: yup.object({
        flatRate: yup.number().required(),
        percentage: yup.number().required(),
        months: yup.number().required(),
        defects: yup.string().required(),
    }),
    gdpr: yup.boolean().required(),
    additional: yup.object({
        date: yup.string().required(),
        commisionerSignature: yup.string().required(),
        agentSignature: yup.string().required(),
    }),
});

export const getValues = (agreement?: IAgreement) => {
    const {
        variant,
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
    } = agreement || {};

    return {
        variant: variant || "basic",
        draft: draft || false,
        keys: keys || false,
        title: title || "",
        startingDate: startingDate || dayjs().toISOString(),
        expirationDate: expirationDate || dayjs().toISOString(), // TODO: +12 months
        availableAfter: availableAfter || dayjs().toISOString(),
        // ...
        manager: {
            fullname: manager?.fullname || "",
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
            fullname: owner?.fullname || "",
            email: owner?.email || "",
            maidenName: owner?.maidenName || "",
            idCardNo: owner?.idCardNo || "",
            mobilePhone: owner?.mobilePhone || "",
            vat: owner?.vat || "",
            // ...
            city: owner?.city || "",
            street: owner?.street || "",
            number: owner?.number || "",
            // ...
            actingOnMyBehalfFiller: owner?.actingOnMyBehalfFiller || "",
        },
        property: {
            area: property?.area || 0,
            address: property?.address || "",
            addressNo: property?.addressNo || "",
            type: property?.type || "",
            floor: property?.floor || 0,
            livingSpace: property?.livingSpace || 0,
            description: property?.description || "",
            price: property?.price || 0,
        },
        commissionAndDuration: {
            flatRate: commissionAndDuration?.flatRate || 0,
            percentage: commissionAndDuration?.percentage || 0,
            months: commissionAndDuration?.months || 0,
            defects: commissionAndDuration?.defects || "",
        },
        gdpr: gdpr || false,
        additional: {
            date: additional?.date || "",
            commisionerSignature: additional?.commisionerSignature || "",
            agentSignature: additional?.agentSignature || "",
        },
    };
};

export default Schema;
