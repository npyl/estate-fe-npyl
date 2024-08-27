import { IAgreementFormData, IAgreementType } from "@/types/agreements";
import { loadPdf } from "../PDFEditor/util";
import { useState } from "react";
import { generate } from "@pdfme/generator";
import { PreferredLanguageType } from "@/types/enums";
import { getAuto } from "../Preparation/mapper";
import { PDF_PLUGINS_LIST } from "@/components/PDFPlugins/_shared/constants";
import flattenObject from "@/utils/flattenObject";

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
            plugins: PDF_PLUGINS_LIST,
        });

        setGenerating(false);

        return pdf;
    };

    return { generatePDF, isGenerating };
};

export { useGeneratePDF };
