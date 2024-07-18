import { useEffect, useMemo, useRef } from "react";
import type { Form } from "@pdfme/ui";
import { useFormContext } from "react-hook-form";
import { IAgreementReq, IAgreementType } from "@/types/agreements";
import { flattenObject, loadPdf } from "./util";
import { getTRIGGER_OPTIONS } from "./constants/trigger";

const useForm = (formRef: React.MutableRefObject<HTMLDivElement | null>) => {
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
                        // plugins: {},
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

//
//  Validates only the pdfme form using trigger()
//
const useValidatePDF = () => {
    const { watch, trigger } = useFormContext();

    const isDraft = watch("draft");
    const variant = watch("variant") as IAgreementType;

    const TRIGGER_OPTIONS = useMemo(
        () => getTRIGGER_OPTIONS(variant),
        [variant]
    );

    const validate = async () => {
        if (isDraft) return true;

        return await trigger(TRIGGER_OPTIONS);
    };

    return { validate };
};

export { useForm, useValidatePDF };
