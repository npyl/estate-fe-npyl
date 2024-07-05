import { useEffect, useRef } from "react";
import type { Form } from "@pdfme/ui";
import { BasicSchema } from "./constants";
import { useFormContext } from "react-hook-form";
import { IAgreementReq } from "@/types/agreements";
import { flattenObject } from "./util";
import { Template } from "@pdfme/common";

export const getSampleTemplate = (basePdf: any): Template => ({
    schemas: BasicSchema,
    basePdf,
});

export const useForm = (
    formRef: React.MutableRefObject<HTMLDivElement | null>
) => {
    const { watch, setValue } = useFormContext();
    const all = watch() as IAgreementReq;
    const { variant, lang } = all;

    const form = useRef<Form | null>(null);

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

                return template;
            } catch (error) {
                console.error("Error loading PDF:", error);
                return null;
            }
        };

        loadPdf().then((template) => {
            if (formRef.current && form.current === null && !!template) {
                import("@pdfme/ui").then(({ Form }) => {
                    const inputs = [flattenObject(all)];

                    form.current = new Form({
                        domContainer: formRef.current!!,
                        template,
                        inputs: inputs || [{}],
                        // ...
                        // plugins: { text, image, ...barcodes },
                        // options: { font },
                    });

                    form.current.onChangeInput(({ key, value }) =>
                        setValue(key, value)
                    );
                });
            }
        });
    }, []);

    return form.current;
};
