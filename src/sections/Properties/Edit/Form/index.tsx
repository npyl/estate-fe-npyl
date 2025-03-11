import usePropertyForm, { IPropertyYup } from "./hook";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import { FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef } from "react";
import { GenerateCheckboxRef } from "./BottomBar/GenerateCheckbox";
import BottomBar from "./BottomBar";
// ...
const Residential = dynamic(() => import("./forms/Residential"));
const Commercial = dynamic(() => import("./forms/Commercial"));
const Land = dynamic(() => import("./forms/Land"));
const Other = dynamic(() => import("./forms/Other"));
// Watchers
const ErrorWatcher = dynamic(() => import("./ErrorWatcher"));

interface IFormProps {
    property?: IProperties;
    onSubmitSuccess?: VoidFunction;
    onSubmit: (b: IPropertiesPOST, generate: boolean) => Promise<boolean>;
}

function Form({ property, onSubmit, onSubmitSuccess }: IFormProps) {
    const [methods, { PersistNotice }] = usePropertyForm(
        property,
        onSubmitSuccess
    );

    const haveError = useMemo(
        () => Object.keys(methods.formState.errors).length > 0,
        [methods.formState.errors]
    );

    const checkboxRef = useRef<GenerateCheckboxRef>(null);
    const handleSubmit = useCallback(
        async (data: IPropertyYup) => {
            const generate = checkboxRef.current?.getGenerate() || false;
            return await onSubmit(data as IPropertiesPOST, generate);
        },
        [onSubmit]
    );

    const pc = property?.parentCategory?.key;

    return (
        <>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <FormProvider {...methods}>
                    {pc === "RESIDENTIAL" ? <Residential /> : null}
                    {pc === "COMMERCIAL" ? <Commercial /> : null}
                    {pc === "LAND" ? <Land /> : null}
                    {pc === "OTHER" ? <Other /> : null}

                    <BottomBar
                        checkboxRef={checkboxRef}
                        PersistNotice={PersistNotice}
                    />
                </FormProvider>
            </form>

            {/* Watchers w/ effects */}
            {haveError ? <ErrorWatcher /> : null}
        </>
    );
}

export default Form;
