// Flattening in this context is the process of converting a nested object into a single-level object.
// This implementation recursively traverses the object, creating new keys that represent the path to each value using dot notation.
// The result is a flat structure where complex nested data is represented by keys like "parent.child.grandchild",

import { IAgreementType } from "@/types/agreements";
import { TLanguageType } from "@/types/translation";
import { Template } from "@pdfme/common";
import { BasicSchema } from "./constants";

export interface NestedObject {
    [key: string]: any;
}

function flattenObject(obj: NestedObject, parentKey = ""): NestedObject {
    const flattened: NestedObject = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const nestedKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof value === "object" && value !== null) {
                const nestedFlattened = flattenObject(value, nestedKey);
                Object.assign(flattened, nestedFlattened);
            } else {
                flattened[nestedKey] = `${value}`;
            }
        }
    }

    return flattened;
}

const getSampleTemplate = (basePdf: any): Template => ({
    schemas: BasicSchema,
    basePdf,
});

const loadPdf = async (variant: IAgreementType, lang: TLanguageType) => {
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

        const template = getSampleTemplate(basePdf);

        return template;
    } catch (error) {
        return null;
    }
};

export { flattenObject, loadPdf };
