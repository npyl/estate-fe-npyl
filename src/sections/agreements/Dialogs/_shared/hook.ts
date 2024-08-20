import { IAgreementFormData, IAgreementType } from "@/types/agreements";
import { flattenObject, loadPdf } from "../PDFEditor/util";
import { useState } from "react";
import { generate } from "@pdfme/generator";
import { PreferredLanguageType } from "@/types/enums";
import { text } from "@pdfme/schemas";
import readOnly from "@/components/PDFPlugins/readOnly";
import errorTooltip from "@/components/PDFPlugins/errorTooltip";
import signature from "@/components/PDFPlugins/signature";
import { getAuto } from "../Preparation/mapper";

const useGeneratePDF = () => {
    const [isGenerating, setGenerating] = useState(false);

    const generatePDF = async (
        variant: IAgreementType,
        lang: PreferredLanguageType,
        formData: IAgreementFormData
    ) => {
        setGenerating(true);

        const { additional } = formData || {};

        const data = {
            ...formData,
            ...getAuto(additional?.date, formData?.owner?.email || ""),
        };

        const inputs = [flattenObject(data)];

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
