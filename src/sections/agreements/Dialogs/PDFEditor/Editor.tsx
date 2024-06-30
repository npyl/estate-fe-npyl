import { useForm } from "./hook";
import { useEffect, useRef, useState } from "react";
import { Template } from "@pdfme/common";
import { BasicSchema } from "./constants";
import { IAgreementReq } from "@/types/agreements";
import { useFormContext } from "react-hook-form";
import { flattenObject } from "./util";

export const getSampleTemplate = (basePdf: any): Template => ({
    schemas: BasicSchema,
    basePdf,
});

const PDFEditor = () => {
    const { watch } = useFormContext();

    const [template, setTemplate] = useState<Template | null>(null);

    const all = watch() as IAgreementReq;
    const { variant, lang } = all;

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
