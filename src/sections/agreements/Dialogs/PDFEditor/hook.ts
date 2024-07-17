import { useEffect, useRef } from "react";
import type { Form } from "@pdfme/ui";
import { useFormContext } from "react-hook-form";
import { IAgreementReq } from "@/types/agreements";
import { flattenObject, loadPdf } from "./util";

export const useForm = (
    formRef: React.MutableRefObject<HTMLDivElement | null>
) => {
    const { watch, setValue } = useFormContext();
    const all = watch() as IAgreementReq;
    const { variant, lang } = all;

    const form = useRef<Form | null>(null);

    useEffect(() => {
        loadPdf(variant, lang).then((template) => {
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
