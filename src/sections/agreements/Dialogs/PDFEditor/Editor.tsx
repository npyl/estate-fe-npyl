import { useForm } from "./hook";
import { useEffect, useRef, useState } from "react";
import { Template } from "@pdfme/common";

export const getSampleTemplate = (basePdf: any): Template => ({
    schemas: [
        {
            name: {
                type: "text",
                position: {
                    x: 25.06,
                    y: 26.35,
                },
                width: 77.77,
                height: 18.7,
                fontSize: 36,
                fontColor: "#14b351",
            },
        },
    ],
    basePdf,
});

const PDFEditor = () => {
    const [template, setTemplate] = useState<Template | null>(null);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const res = await fetch("/api/pdf", {
                    headers: {
                        "Content-Type": "application/pdf",
                    },
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
