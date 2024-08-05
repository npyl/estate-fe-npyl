import { useEffect, useMemo, useRef } from "react";
import type { Form } from "@pdfme/ui";
import { useFormContext } from "react-hook-form";
import { IAgreementReq, IAgreementType } from "@/types/agreements";
import { flattenObject, loadPdf } from "./util";
import { getTRIGGER_OPTIONS } from "./constants/trigger";
import signature from "@/components/PDFPlugins/signature";
import readOnly from "@/components/PDFPlugins/readOnly";
import errorTooltip from "./plugins/errorTooltip";
import { text } from "@pdfme/schemas";

const flatRateKey = "commissionAndDuration.flatRate";
const percentageKey = "commissionAndDuration.percentage";
const priceKey = "property.price";

interface KeyValuePair {
    key: string;
    value: string;
}

const useForm = (formRef: React.MutableRefObject<HTMLDivElement | null>) => {
    const { watch, setValue } = useFormContext();
    const all = watch() as IAgreementReq;
    const { variant, language } = all;

    const form = useRef<Form | null>(null);

    const handleInputChange = ({ key, value }: KeyValuePair) => {
        setValue(key, value);

        //
        // Custom handling for flatRate and percentage
        //
        if (key !== flatRateKey && key !== percentageKey) return;

        if (key === flatRateKey) {
            setValue(percentageKey, "-");
        }

        if (key === percentageKey) {
            const price = watch(priceKey);

            if (isNaN(Number(price)) || isNaN(Number(value))) return;

            const flatRate = (+price * +value) / 100;

            setValue(flatRateKey, flatRate);
        }

        // update inputs so that change is visible!
        const all = watch();
        const inputs = [flattenObject(all)];
        form.current?.setInputs(inputs);
    };

    useEffect(() => {
        loadPdf(variant, language).then((template) => {
            if (formRef.current && form.current === null && !!template) {
                import("@pdfme/ui").then(({ Form }) => {
                    try {
                        const inputs = [flattenObject(all)];

                        form.current = new Form({
                            domContainer: formRef.current!!,
                            template,
                            inputs: inputs || [{}],
                            plugins: {
                                text,
                                readOnly,
                                errorTooltip,
                                signature,
                            },
                        });

                        form.current.onChangeInput(handleInputChange);
                    } catch (ex) {}
                });
            }
        });

        return () => {
            form.current?.destroy();
        };
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
