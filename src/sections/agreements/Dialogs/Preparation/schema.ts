import { IAgreement, IAgreementReq } from "@/types/agreements";
import { z } from "zod";
import dayjs from "dayjs";

const baseSchema = z.object({
    propertyId: z.number().min(1, "Please make sure to select a property!"),
    ownerId: z.number().min(1, "Please make sure to select a property!"),
    variant: z.enum(["BASIC", "BASIC_EXCLUSIVE", "PURCHASE"]),
    draft: z.boolean(),
});

const EmptySchema = baseSchema.extend({
    draft: z.literal(true),
});

const mandatorySchema = baseSchema.extend({
    id: z.number().gt(0).optional(),
    propertyId: z.number().gt(0, "Please make sure to select a property!"),
    ownerId: z.number().gt(0, "Please make sure to select a property!"),

    language: z.enum(["ENGLISH", "GREEK"]),
    draft: z.literal(false),
    keys: z.boolean(),
    signed: z.boolean(),
    title: z.string(),
    startingDate: z.string(),
    expirationDate: z.string(),
    availableAfter: z.string(),
    // ...
    manager: z.object({
        fullName: z.string(),
        title: z.string(),
        vat: z.string(),
        taxOffice: z.string(),
        genComReg: z.string(), // ΓΕΜΗ
    }),
    company: z.object({
        address: z.string(),
        homePhone: z.string(),
        mobilePhone: z.string(),
        email: z.string(),
    }),
    owner: z.object({
        fullName: z.string(),
        email: z.string(),
        maidenName: z.string(),
        idCardNumber: z.string(),
        vat: z.string(),
        // ...
        city: z.string(),
        street: z.string(),
        number: z.string(),
        // ...
        actingOnMyBehalf: z.string(),
    }),
    property: z.object({
        region: z.string(),
        address: z.string(),
        addressNumber: z.string(),
        type: z.string(),
        floor: z.string(),
        livingSpace: z.string(),
        description: z.string(),
        price: z.string(),
    }),
    commissionAndDuration: z.object({
        payment: z.string(),
        flatRate: z.string(),
        percentage: z.string(),
        defects: z.string(),
    }),
    gdpr: z
        .object({
            email: z.string().email().optional(),
            address: z.string().optional(),
        })
        .optional(),
    additional: z.object({
        // TODO: ...
        date: z.string().optional(),
        commisionerSignature: z.string().optional(),
        agentSignature: z.string().optional(),
    }),
});

const basicSchema = mandatorySchema.extend({
    variant: z.literal("BASIC"),
});

const basicExclusiveSchema = mandatorySchema.extend({
    variant: z.literal("BASIC_EXCLUSIVE"),

    owner: z.object({
        mobilePhone: z.string(),
    }),
    commissionAndDuration: z.object({
        months: z.string(),
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
        gdpr,
        additional: {
            date: additional?.date || "",
            commisionerSignature: additional?.commisionerSignature || "",
            agentSignature: additional?.agentSignature || "",
        },

        suggestedProperties: suggestedProperties,

        signed:
            !!additional?.commisionerSignature &&
            !!additional.commisionerSignature,
    };
};

export default Schema;
