import useDialog from "@/hooks/useDialog";
import useForm from "./useForm";
import { FC, PropsWithChildren, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { IAgreementReq } from "@/types/agreements";
import flattenObject from "@/utils/flattenObject";
import { KeyValuePair } from "./types";
import { PDFEditorProvider } from "./context";

const flatRateKey = "commissionAndDuration.flatRate";
const percentageKey = "commissionAndDuration.percentage";
const priceKey = "property.price";

const PDFEditor: FC<PropsWithChildren> = ({ children }) => {
    const { watch, setValue } = useFormContext();

    const [isLoaded, setLoaded] = useDialog();

    const formRef = useRef<HTMLDivElement>(null);

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

            setValue(flatRateKey, flatRate.toString());
        }

        // update inputs so that change is visible!
        reloadInputs();
    };

    const reloadInputs = () => {
        const all = watch() as IAgreementReq;
        const inputs = [flattenObject(all)];
        form?.setInputs(inputs);
    };

    const form = useForm(formRef, setLoaded, handleInputChange);

    return (
        <div ref={formRef}>
            {/* If form is loaded, load any children */}
            {isLoaded && children ? (
                <PDFEditorProvider reloadInputs={reloadInputs}>
                    {children}
                </PDFEditorProvider>
            ) : null}
        </div>
    );
};

export default PDFEditor;
