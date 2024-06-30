import { useForm } from "./hook";
import { useEffect, useRef, useState } from "react";
import { Template } from "@pdfme/common";
import { BasicSchema } from "./constants";
import { IAgreementType } from "@/types/agreements";
import { TLanguageType } from "@/types/translation";

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

    useForm({ formRef, template });

    return <div ref={formRef} />;
};

export default PDFEditor;
