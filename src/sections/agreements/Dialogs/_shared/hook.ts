import { IAgreementType } from "@/types/agreements";
import { TLanguageType } from "@/types/translation";
import { loadPdf, NestedObject } from "../PDFEditor/util";
import { useState } from "react";
import { generate } from "@pdfme/generator";

const useGeneratePDF = (
    variant: IAgreementType,
    lang: TLanguageType,
    inputs: NestedObject[]
) => {
    const [isGenerating, setGenerating] = useState(false);

    const generatePDF = async () => {
        setGenerating(true);

        const template = await loadPdf(variant, lang);
        if (!template) {
            setGenerating(false);
            return;
        }

        const pdf = await generate({ template, inputs });

        setGenerating(false);

        return pdf;
    };

    return { generatePDF, isGenerating };
};

export { useGeneratePDF };
