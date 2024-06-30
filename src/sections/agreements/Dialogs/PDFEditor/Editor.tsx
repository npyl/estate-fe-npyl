import { useForm } from "./hook";
import { useEffect, useRef, useState } from "react";
import { Template } from "@pdfme/common";
import { BasicSchema } from "./constants";
import { IAgreementReq, IAgreementType } from "@/types/agreements";
import { TLanguageType } from "@/types/translation";
import { useFormContext } from "react-hook-form";
import { flattenObject } from "./util";

export const getSampleTemplate = (basePdf: any): Template => ({
    schemas: BasicSchema,
    basePdf,
});

interface Props {
    variant: IAgreementType;
    lang: TLanguageType;
}

const PDFEditor: React.FC<Props> = ({ variant, lang }) => {
    const [template, setTemplate] = useState<Template | null>(null);

    const { watch } = useFormContext();
    const all = watch() as IAgreementReq;

    useEffect(() => {
        const loadPdf = async () => {
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

                const basePdf = await res.text();

                const template = getSampleTemplate(basePdf);

                setTemplate(template);
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        };
        loadPdf();
    }, []);

    const formRef = useRef<HTMLDivElement>(null);

    useForm(formRef, template, [flattenObject(all)]);

    return <div ref={formRef} />;
};

export default PDFEditor;
