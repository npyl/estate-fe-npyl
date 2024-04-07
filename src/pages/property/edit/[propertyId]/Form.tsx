import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Residential, Commercial, Land, Other } from "./forms";
import { useCallback, useMemo } from "react";
import PreventButton from "src/components/Button/Prevent";
import { IProperties, IPropertiesPOST } from "src/types/properties";

// Form
import FormProvider from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import usePropertyForm, { fixDropdowns } from "./hook";

interface IFormProps {
    property?: IProperties;
    isLoading: boolean;
    isError: boolean;
    onClear: () => void;
    onSave: (body: IPropertiesPOST) => void;
    onCancel: () => void;
}

export default function Form({
    property,
    isLoading,
    isError,
    onSave,
    onClear,
    onCancel,
}: IFormProps) {
    const { t } = useTranslation();

    const { methods, handleSubmit, reset } = usePropertyForm(property);

    // enums
    const parentCategory = useMemo(
        () => property?.parentCategory?.key,
        [property?.parentCategory]
    );

    const onSubmit = handleSubmit((data) => {
        try {
            onSave({
                ...(data as IPropertiesPOST),
                ...(fixDropdowns(data as IPropertiesPOST) as IPropertiesPOST),
            });
        } catch (error) {
            console.error(error);
            reset();
        }
    });

    const handleClear = useCallback(() => {
        reset();
        onClear();
    }, []);

    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            {!!property ? (
                <>
                    {parentCategory === "RESIDENTIAL" && <Residential />}
                    {parentCategory === "COMMERCIAL" && <Commercial />}
                    {parentCategory === "LAND" && <Land />}
                    {parentCategory === "OTHER" && <Other />}
                </>
            ) : null}

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
            >
                <PreventButton
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={onCancel}
                >
                    {t("Cancel")}
                </PreventButton>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleClear}
                >
                    {t("Clear")}
                </Button>

                <LoadingButton
                    loading={isLoading && !isError}
                    variant="contained"
                    startIcon={<SendIcon />}
                    type="submit"
                >
                    {t("Save")}
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
