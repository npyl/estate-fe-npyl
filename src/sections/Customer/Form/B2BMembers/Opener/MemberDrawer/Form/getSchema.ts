import { TranslationType } from "@/types/translation";
import { z } from "zod";

const getSchema = (t: TranslationType) =>
    z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),

        email: z
            .string()
            .email(t("Must be a valid email") || "")
            .max(255)
            .min(1, t("Email is required") || ""),

        position: z.string().optional(),

        mobilePhone: z.string().optional(),
        homePhone: z.string().optional(),

        fax: z.string().optional(),

        nationality: z.string().nullable(),
        preferredLanguage: z.string().nullable(),

        suggestedBy: z.string().optional(),
    });

export default getSchema;
