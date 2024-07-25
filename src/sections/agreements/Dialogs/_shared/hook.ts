import { IAgreementType } from "@/types/agreements";
import { loadPdf, NestedObject } from "../PDFEditor/util";
import { useState } from "react";
import { generate } from "@pdfme/generator";
import { PreferredLanguageType } from "@/types/enums";

const useGeneratePDF = () => {
    const [isGenerating, setGenerating] = useState(false);

    const generatePDF = async (
        variant: IAgreementType,
        lang: PreferredLanguageType,
        inputs: NestedObject[]
    ) => {
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
