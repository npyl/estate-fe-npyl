import { z } from "zod";

const nonEmptyString = z.string().min(1);

const EmptySchema = z
    .object({
        id: z.number().gt(0).optional(),
        draft: z.literal(true),
        propertyId: z.number().gt(0, "Please make sure to select a property!"),
        ownerId: z.number().gt(0, "Please make sure to select a property!"),
        language: z.enum(["ENGLISH", "GREEK"]),
        variant: z.enum(["BASIC", "BASIC_EXCLUSIVE", "PURCHASE"]),
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
        flatRate: nonEmptyString,
        percentage: nonEmptyString,
        defects: nonEmptyString,
    }),
    gdpr: z
        .object({
            address: z.string().optional(),
        })
        .optional(),
    additional: z.object({
        date: z.string(),
        commissionerSignature: z.string().optional(),
        agentSignature: z.string().optional(),
    }),

    suggestedProperties: z.array(z.object({})).optional(),
});

const SuggestedPropertiesSchema = z.object({
    area: z.string(),
    address: z.string(),
    type: z.string(),
    livingSpace: z.string(),
    price: z.string(),
    fee: z.string(),
});

// ----------------------------------------------------------------------

const basicSchema = mandatorySchema.extend({
    variant: z.literal("BASIC"),
});

const basicExclusiveSchema = mandatorySchema.extend({
    variant: z.literal("BASIC_EXCLUSIVE"),

    owner: mandatorySchema.shape.owner.extend({
        mobilePhone: nonEmptyString,
    }),
    commissionAndDuration: mandatorySchema.shape.commissionAndDuration.extend({
        months: nonEmptyString,
    }),
});

const purchaseSchema = mandatorySchema.extend({
    variant: z.literal("PURCHASE"),

    propertyId: z.literal(undefined),
    property: z.object({}),

    suggestedProperties: z.array(SuggestedPropertiesSchema).min(1).max(4),
});

const NonDraftSchema = z.discriminatedUnion("variant", [
    basicSchema,
    basicExclusiveSchema,
    purchaseSchema,
]);

const Schema = z.union([EmptySchema, NonDraftSchema]);

export default Schema;
