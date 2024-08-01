import { IAgreementType } from "@/types/agreements";
import { loadPdf, NestedObject } from "../PDFEditor/util";
import { useState } from "react";
import { generate } from "@pdfme/generator";
import { PreferredLanguageType } from "@/types/enums";
import { text } from "@pdfme/schemas";
import readOnly from "../PDFEditor/plugins/readOnly";
import errorTooltip from "../PDFEditor/plugins/errorTooltip";
import signature from "../PDFEditor/plugins/signature";

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

        const pdf = await generate({
            template,
            inputs,
            plugins: { text, readOnly, errorTooltip, signature },
        });

        setGenerating(false);

        return pdf;
    };

    return { generatePDF, isGenerating };
};

export { useGeneratePDF };
