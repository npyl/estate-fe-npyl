import { useEffect, useRef } from "react";
import { IAgreementReq } from "@/types/agreements";
import { loadPdf } from "../util";
import { getPDF_PLUGINS_LIST } from "@/components/PDFPlugins/_shared/constants";
import { Form } from "@pdfme/ui";
import { KeyValuePair } from "./types";
import flattenObject from "@/utils/flattenObject";

const useForm = (
    formRef: React.MutableRefObject<HTMLDivElement | null>,
    agreement: IAgreementReq,
    // ...
    onLoad: () => void,
    onInputChange: ({ key, value }: KeyValuePair) => void
) => {
    const { variant, language } = agreement;

    const form = useRef<Form | null>(null);

    useEffect(() => {
        loadPdf(variant, language).then((template) => {
            if (!template) return;
            if (!formRef.current || form.current !== null) return;

            try {
                const inputs = [flattenObject(agreement)];

                form.current = new Form({
                    domContainer: formRef.current!!,
                    template,
                    inputs: inputs || [{}],
                    plugins: getPDF_PLUGINS_LIST(onLoad),
                });

                form.current.onChangeInput(onInputChange);
            } catch (ex) {}
        });

        return () => {
            form.current?.destroy();
            form.current = null;
        };
    }, []);

    return form.current;
};

export default useForm;
