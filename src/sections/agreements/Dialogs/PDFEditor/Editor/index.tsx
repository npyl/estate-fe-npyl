import { FC, PropsWithChildren, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IAgreementReq } from "@/types/agreements";
import flattenObject from "@/utils/flattenObject";
import { KeyValuePair } from "./Form/types";
import { PDFEditorProvider } from "./context";
import { TForm } from "../../Preparation/types";
import Form, { FormRef } from "./Form";

const flatRateKey = "commissionAndDuration.flatRate";
const percentageKey = "commissionAndDuration.percentage";
const priceKey = "property.price";

const PDFEditor: FC<PropsWithChildren> = ({ children }) => {
    const form = useRef<FormRef>(null);

    const { getValues, setValue } = useFormContext<TForm>();

    const price = useWatch<TForm>({ name: priceKey }) || "";

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
            if (isNaN(Number(price)) || isNaN(Number(value))) return;

            const flatRate = (+price * +value) / 100;

            setValue(flatRateKey, flatRate.toString());
        }

        // update inputs so that change is visible!
        reloadInputs();
    };

    const reloadInputs = () => {
        const all = getValues();
        const inputs = [flattenObject(all)];
        form.current?.setInputs(inputs);
    };

    return (
        <Form ref={form} onInputChange={handleInputChange}>
            <PDFEditorProvider reloadInputs={reloadInputs}>
                {children}
            </PDFEditorProvider>
        </Form>
    );
};

export default PDFEditor;
