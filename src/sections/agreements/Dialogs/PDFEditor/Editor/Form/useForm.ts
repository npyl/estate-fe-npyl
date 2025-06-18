import { useEffect, useRef } from "react";
import { IAgreementType } from "@/types/agreements";
import { loadPdf } from "../../util";
import { getPDF_PLUGINS_LIST } from "@/components/PDFPlugins/_shared/constants";
import { Form } from "@pdfme/ui";
import { KeyValuePair } from "./types";
import flattenObject from "@/utils/flattenObject";
import { useFormContext, useWatch } from "react-hook-form";
import { TForm } from "../../../Preparation/types";
import { PreferredLanguageType } from "@/types/enums";

const useTypedValues = () => {
    const { getValues } = useFormContext<TForm>();

    const variant = useWatch<TForm>({ name: "variant" }) as IAgreementType;
    const language = useWatch<TForm>({
        name: "language",
    }) as PreferredLanguageType;

    return { getValues, variant, language };
};

const useForm = (
    formRef: React.MutableRefObject<HTMLDivElement | null>,
    // ...
    onLoad: () => void,
    onInputChange: ({ key, value }: KeyValuePair) => void
) => {
    const { getValues, language, variant } = useTypedValues();

    const form = useRef<Form | null>(null);

    useEffect(() => {
        loadPdf(variant, language).then((template) => {
            if (!template) return;
            if (!formRef.current || form.current !== null) return;

            try {
                const all = getValues();

                const inputs = [flattenObject(all)];

                form.current = new Form({
                    domContainer: formRef.current!!,
                    template,
                    inputs: inputs || [{}],
                    plugins: getPDF_PLUGINS_LIST(onLoad),
                });

                form.current.onChangeInput(
                    onInputChange as Form["onChangeInputCallback"]
                );
            } catch (ex) {}
        });

        return () => {
            form.current?.destroy();
            form.current = null;
        };
    }, [getValues, variant, language]);

    return form.current;
};

export default useForm;
