import { useEffect, useRef } from "react";
import type { Template } from "@pdfme/common";
import type { Form } from "@pdfme/ui";

export const useForm = (props: {
    formRef: React.MutableRefObject<HTMLDivElement | null>;
    template: Template | null;
}) => {
    const { formRef, template } = props;
    const form = useRef<Form | null>(null);

    useEffect(() => {
        if (!template) return;

        if (formRef.current && form.current === null) {
            import("@pdfme/ui").then(({ Form }) => {
                form.current = new Form({
                    domContainer: formRef.current!!,
                    template,
                    // plugins: { text, image, ...barcodes },
                    inputs: [{}],
                    // options: { font },
                });
            });
        } else if (form.current) {
            form.current?.updateTemplate(template);
            form.current.setInputs([{}]);
        }
    }, [template]);

    return form.current;
};
