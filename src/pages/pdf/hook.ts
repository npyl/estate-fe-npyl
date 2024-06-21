import { useEffect, useRef, useState } from "react";
import type { Template } from "@pdfme/common";
import type { Form } from "@pdfme/ui";
import { text, image, barcodes } from "@pdfme/schemas";

const useForceUpdate = () => {
    const [, forceUpdate] = useState(0);
    return () => forceUpdate((s) => s + 1);
};

export const useForm = (props: {
    formRef: React.MutableRefObject<HTMLDivElement | null>;
    template: Template | null;
}) => {
    const { formRef, template } = props;
    const form = useRef<Form | null>(null);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (formRef.current && form.current === null && template) {
            Promise.all([import("@pdfme/ui")]).then(([{ Form }]) => {
                form.current = new Form({
                    domContainer: formRef.current!!,
                    template,
                    // plugins: { text, image, ...barcodes },
                    inputs: [{}],
                    // options: { font },
                });
                form.current.onChangeInput(forceUpdate);
                forceUpdate();
            });
        } else if (form.current && template) {
            form.current?.updateTemplate(template);
            form.current.setInputs([{}]);
        }

        forceUpdate();
    }, [formRef.current, template]);

    return form.current;
};
