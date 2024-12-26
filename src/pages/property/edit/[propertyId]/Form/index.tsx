import { Stack } from "@mui/material";
import usePropertyForm, { fixDropdowns, IPropertyYup } from "./hook";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import { FormProvider } from "react-hook-form";
import ClearButton from "./ClearButton";
import SubmitButton from "./SubmitButton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import CancelButton from "./CancelButton";
import { useEditPropertyMutation } from "@/services/properties";
const ErrorWatcher = dynamic(() => import("./ErrorWatcher"));
const UnsavedChangesWatcher = dynamic(() => import("./UnsavedChangesWatcher"));
// ...
const Residential = dynamic(() => import("./forms/Residential"));
const Commercial = dynamic(() => import("./forms/Commercial"));
const Land = dynamic(() => import("./forms/Land"));
const Other = dynamic(() => import("./forms/Other"));

interface IFormProps {
    property?: IProperties;
}

export default function Form({ property }: IFormProps) {
    const { methods } = usePropertyForm(property);
    const isDirty = methods.formState.isDirty;

    const [edit] = useEditPropertyMutation();

    const haveError = useMemo(
        () => Object.keys(methods.formState.errors).length > 0,
        [methods.formState.errors]
    );

    const handleSubmit = (data: IPropertyYup) => {
        try {
            const body = {
                ...(data as IPropertiesPOST),
                ...(fixDropdowns(data as IPropertiesPOST) as IPropertiesPOST),
            };

            edit({
                body,
                id: property?.id!,
            });
        } catch (error) {
            console.error(error);
            methods.reset();
        }
    };

    const pc = property?.parentCategory?.key;

    return (
        <>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <FormProvider {...methods}>
                    {pc === "RESIDENTIAL" ? <Residential /> : null}
                    {pc === "COMMERCIAL" ? <Commercial /> : null}
                    {pc === "LAND" ? <Land /> : null}
                    {pc === "OTHER" ? <Other /> : null}

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        spacing={1}
                        mt={2}
                        sx={{
                            backgroundColor: "rgba(128, 128, 128, 0.1)",
                            width: "100%",
                            p: 0.5,
                            alignSelf: "flex-end",
                            borderRadius: "10px",
                            position: "sticky",
                            zIndex: 1000,
                            bottom: 1,
                        }}
                    >
                        <CancelButton />
                        <ClearButton />
                        <SubmitButton />
                    </Stack>
                </FormProvider>
            </form>

            {/* Watchers w/ effects */}
            {isDirty ? <UnsavedChangesWatcher /> : null}
            {haveError ? <ErrorWatcher /> : null}
        </>
    );
}
