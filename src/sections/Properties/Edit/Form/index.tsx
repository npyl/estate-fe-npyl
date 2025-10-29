import usePropertyForm from "./usePropertyForm";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import { FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { FC, useCallback, useRef } from "react";
import { GenerateCheckboxRef } from "./BottomBar/GenerateCheckbox";
import BottomBar from "./BottomBar";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
// ...
const Residential = dynamic(() => import("./forms/Residential"));
const Commercial = dynamic(() => import("./forms/Commercial"));
const Land = dynamic(() => import("./forms/Land"));
const Other = dynamic(() => import("./forms/Other"));
// Watchers
import ErrorWatcher from "./ErrorWatcher";

interface IFormProps {
    property?: IProperties;
    onSubmitSuccess?: VoidFunction;
    onSubmit: (b: IPropertiesPOST, generate: boolean) => Promise<boolean>;
}

const Form: FC<IFormProps> = ({ property, onSubmit, onSubmitSuccess }) => {
    const { t } = useTranslation();
    const [methods, { PersistNotice }] = usePropertyForm(
        property,
        onSubmitSuccess
    );

    const checkboxRef = useRef<GenerateCheckboxRef>(null);
    const handleSubmit = useCallback(
        async (
            data: IPropertiesPOST,
            generate: boolean,
            shouldRedirect: boolean
        ) => {
            const res = await onSubmit(data, generate);

            if (res && shouldRedirect && onSubmitSuccess) {
                onSubmitSuccess();
            }

            return res;
        },
        [onSubmit, onSubmitSuccess]
    );

    const pc = property?.parentCategory?.key;

    const handleSubmitWithoutRedirect = useCallback(
        async (data: IPropertiesPOST, generate: boolean) => {
            const isSuccess = await handleSubmit(data, generate, false); // Don't redirect

            if (isSuccess) {
                toast.success(t("Changes saved successfully!"));
            } else {
                toast.error(t("Failed to save changes."));
            }
        },
        [handleSubmit]
    );
    return (
        <form
            onSubmit={methods.handleSubmit((data) =>
                handleSubmit(
                    data as IPropertiesPOST,
                    checkboxRef.current?.getGenerate() || false,
                    true
                )
            )}
        >
            <FormProvider {...methods}>
                {pc === "RESIDENTIAL" ? <Residential /> : null}
                {pc === "COMMERCIAL" ? <Commercial /> : null}
                {pc === "LAND" ? <Land /> : null}
                {pc === "OTHER" ? <Other /> : null}

                <BottomBar
                    checkboxRef={checkboxRef}
                    PersistNotice={PersistNotice}
                    onSubmitWithoutRedirect={() =>
                        handleSubmitWithoutRedirect(
                            methods.getValues() as IPropertiesPOST,
                            checkboxRef.current?.getGenerate() || false
                        )
                    }
                />

                {/* Watchers w/ effects */}
                <ErrorWatcher />
            </FormProvider>
        </form>
    );
};

export default Form;
