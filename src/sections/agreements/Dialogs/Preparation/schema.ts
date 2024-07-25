import { IAgreement, IAgreementReq } from "@/types/agreements";
import { z } from "zod";
import dayjs from "dayjs";

const nonEmptyString = z.string().min(1);

const EmptySchema = z
    .object({
        draft: z.literal(true),
    })
    .passthrough();

const mandatorySchema = z.object({
    id: z.number().gt(0).optional(),
    propertyId: z.number().gt(0, "Please make sure to select a property!"),
    ownerId: z.number().gt(0, "Please make sure to select a property!"),

    language: z.enum(["ENGLISH", "GREEK"]),
    draft: z.literal(false),
    keys: z.boolean(),
    signed: z.boolean(),
    title: nonEmptyString,
    startingDate: nonEmptyString,
    expirationDate: nonEmptyString,
    availableAfter: nonEmptyString,
    // ...
    manager: z.object({
        fullName: nonEmptyString,
        title: nonEmptyString,
        vat: nonEmptyString,
        taxOffice: nonEmptyString,
        genComReg: nonEmptyString, // ΓΕΜΗ
    }),
    company: z.object({
        address: nonEmptyString,
        homePhone: nonEmptyString,
        mobilePhone: nonEmptyString,
        email: nonEmptyString,
    }),
    owner: z.object({
        fullName: nonEmptyString,
        email: nonEmptyString,
        maidenName: nonEmptyString,
        idCardNumber: nonEmptyString,
        vat: nonEmptyString,
        // ...
        city: nonEmptyString,
        street: nonEmptyString,
        number: nonEmptyString,
        // ...
        actingOnMyBehalf: nonEmptyString,
    }),
    property: z.object({
        region: nonEmptyString,
        address: nonEmptyString,
        addressNumber: nonEmptyString,
        type: nonEmptyString,
        floor: nonEmptyString,
        livingSpace: nonEmptyString,
        description: nonEmptyString,
        price: nonEmptyString,
    }),
    commissionAndDuration: z.object({
        payment: nonEmptyString,
        flatRate: nonEmptyString,
        percentage: nonEmptyString,
        defects: nonEmptyString,
    }),
    gdpr: z
        .object({
            email: nonEmptyString.email().optional(),
            address: nonEmptyString.optional(),
        })
        .optional(),
    additional: z.object({
        // TODO: ...
        date: nonEmptyString.optional(),
        commissionerSignature: nonEmptyString.optional(),
        agentSignature: nonEmptyString.optional(),
    }),
});

const basicSchema = mandatorySchema.extend({
    variant: z.literal("BASIC"),
});

const basicExclusiveSchema = mandatorySchema.extend({
    variant: z.literal("BASIC_EXCLUSIVE"),

    owner: z.object({
        mobilePhone: nonEmptyString,
    }),
    commissionAndDuration: z.object({
        months: nonEmptyString,
    }),
});

const purchaseSchema = mandatorySchema.extend({
    variant: z.literal("PURCHASE"),
});

const NonDraftSchema = z.discriminatedUnion("variant", [
    basicSchema,
    basicExclusiveSchema,
    purchaseSchema,
]);

const Schema = z.union([EmptySchema, NonDraftSchema]);

export const getValues = (
    isCustomer: boolean,
    agreement?: IAgreement
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
        manager,
        company,
        commissionAndDuration,
        additional,
        owner,
        property,
        suggestedProperties,
    } = formData || {};

    const { id: propertyId } = assignedProperty || {};
    const { id: ownerId } = assignedOwner || {};

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
        gdpr: {
            address: gdpr?.address || "",
        },
        additional: {
            date: additional?.date || "",
            commissionerSignature: additional?.commissionerSignature || "",
            agentSignature: additional?.agentSignature || "",
        },

        suggestedProperties: suggestedProperties,

        signed:
            !!additional?.commissionerSignature && !!additional.agentSignature,
    };
};

export default Schema;
