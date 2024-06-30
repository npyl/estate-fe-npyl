import { useEffect, useRef } from "react";
import type { Template } from "@pdfme/common";
import type { Form } from "@pdfme/ui";

type Input = { [key: string]: any };

export const useForm = (
    formRef: React.MutableRefObject<HTMLDivElement | null>,
    template: Template | null,
    inputs?: Input[]
) => {
    const form = useRef<Form | null>(null);

    useEffect(() => {
        if (!template) return;

        if (formRef.current && form.current === null) {
            import("@pdfme/ui").then(({ Form }) => {
                form.current = new Form({
                    domContainer: formRef.current!!,
                    template,
                    inputs: inputs || [{}],
                    // ...
                    // plugins: { text, image, ...barcodes },
                    // options: { font },
                });
            });
        } else if (form.current) {
            form.current?.updateTemplate(template);
            form.current.setInputs(inputs || [{}]);
        }
    }, [template, inputs]);

    return form.current;
};
