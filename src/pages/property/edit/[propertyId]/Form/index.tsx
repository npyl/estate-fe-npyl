import { Button, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";
import usePropertyForm, { fixDropdowns, IPropertyYup } from "./hook";
import { IProperties, IPropertiesPOST } from "src/types/properties";
import { FormProvider } from "react-hook-form";
import UnsavedChangesWatcher from "./UnsavedChangesWatcher";
import ClearButton from "./ClearButton";
import SubmitButton from "./SubmitButton";
import dynamic from "next/dynamic";
// ...
const Residential = dynamic(() => import("./forms/Residential"));
const Commercial = dynamic(() => import("./forms/Commercial"));
const Land = dynamic(() => import("./forms/Land"));
const Other = dynamic(() => import("./forms/Other"));

interface IFormProps {
    property?: IProperties;
    onSave: (body: IPropertiesPOST) => void;
    onCancel: () => void;
}

export default function Form({ property, onSave, onCancel }: IFormProps) {
    const { t } = useTranslation();

    const { methods } = usePropertyForm(property);
    const isDirty = methods.formState.isDirty;

    const handleSubmit = (data: IPropertyYup) => {
        try {
            onSave({
                ...(data as IPropertiesPOST),
                ...(fixDropdowns(data as IPropertiesPOST) as IPropertiesPOST),
            });

            // methods.reset(data); // Reset the form so it's not dirty anymore
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
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={onCancel}
                        >
                            {t("Cancel")}
                        </Button>

                        <ClearButton />

                        <SubmitButton />
                    </Stack>
                </FormProvider>
            </form>

            <UnsavedChangesWatcher isDirty={isDirty} />
        </>
    );
}
