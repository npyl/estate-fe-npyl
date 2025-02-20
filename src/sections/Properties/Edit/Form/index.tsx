import usePropertyForm, { fixDropdowns, IPropertyYup } from "./hook";
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
const UnsavedChangesWatcher = dynamic(() => import("./UnsavedChangesWatcher"));

interface IFormProps {
    property?: IProperties;
    isSuccess: boolean;
    onSubmit: (b: IPropertiesPOST, generate: boolean) => Promise<void>;
}

function Form({ property, isSuccess, onSubmit }: IFormProps) {
    const { methods } = usePropertyForm(property);
    const isDirty = methods.formState.isDirty;

    const haveError = useMemo(
        () => Object.keys(methods.formState.errors).length > 0,
        [methods.formState.errors]
    );

    const checkboxRef = useRef<GenerateCheckboxRef>(null);
    const handleSubmit = useCallback(
        async (data: IPropertyYup) => {
            try {
                const generate = checkboxRef.current?.getGenerate() || false;

                const body = {
                    ...(data as IPropertiesPOST),
                    ...(fixDropdowns(
                        data as IPropertiesPOST
                    ) as IPropertiesPOST),
                };

                await onSubmit(body, generate);
            } catch (error) {
                console.error(error);
                methods.reset();
            }
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

                    <BottomBar checkboxRef={checkboxRef} />
                </FormProvider>
            </form>

            {/* Watchers w/ effects */}
            {isDirty && !isSuccess ? <UnsavedChangesWatcher /> : null}
            {haveError ? <ErrorWatcher /> : null}
        </>
    );
}

export default Form;
