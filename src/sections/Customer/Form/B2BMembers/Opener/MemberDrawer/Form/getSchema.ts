import { TranslationType } from "@/types/translation";
import * as Yup from "yup";

const getSchema = (t: TranslationType) =>
    Yup.object({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),

        email: Yup.string()
            .email(t("Must be a valid email") || "")
            .max(255)
            .required(t("Email is required") || ""),

        position: Yup.string().optional(),

        mobilePhone: Yup.string().optional(),
        homePhone: Yup.string().optional(),

        fax: Yup.string().optional(),

        nationality: Yup.string().optional(),
        preferredLanguage: Yup.string().optional(),

        suggestedBy: Yup.string().optional(),
    });

export default getSchema;
