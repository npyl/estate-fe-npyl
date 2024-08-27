// Flattening in this context is the process of converting a nested object into a single-level object.
// This implementation recursively traverses the object, creating new keys that represent the path to each value using dot notation.
// The result is a flat structure where complex nested data is represented by keys like "parent.child.grandchild",

import { IAgreementType } from "@/types/agreements";
import { Template } from "@pdfme/common";
import {
    BasicEn,
    BasicExclusiveEn,
    PurchaseEn,
    BasicEl,
    BasicExclusiveEl,
    PurchaseEl,
} from "./constants";
import { PreferredLanguageType } from "@/types/enums";

const getSchemaEn = (variant: IAgreementType) =>
    variant === "BASIC"
        ? BasicEn
        : variant === "BASIC_EXCLUSIVE"
        ? BasicExclusiveEn
        : variant === "PURCHASE"
        ? PurchaseEn
        : BasicEn; // fallback
const getSchemaEl = (variant: IAgreementType) =>
    variant === "BASIC"
        ? BasicEl
        : variant === "BASIC_EXCLUSIVE"
        ? BasicExclusiveEl
        : variant === "PURCHASE"
        ? PurchaseEl
        : BasicEl; // fallback

const getSampleTemplate = (
    variant: IAgreementType,
    lang: PreferredLanguageType,
    basePdf: any
): Template => ({
    schemas: lang === "ENGLISH" ? getSchemaEn(variant) : getSchemaEl(variant),
    basePdf,
});

const loadPdf = async (
    variant: IAgreementType,
    lang: PreferredLanguageType
) => {
    try {
        const res = await fetch("/api/pdf", {
            method: "POST",
            headers: {
                "Content-Type": "application/pdf",
            },
            body: JSON.stringify({
                variant,
                lang,
            }),
        });

        if (!res.ok) return null;

        const basePdf = await res.text();

        const template = getSampleTemplate(variant, lang, basePdf);

        return template;
    } catch (error) {
        return null;
    }
};

export { loadPdf };
