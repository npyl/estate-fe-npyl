import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { FC, useCallback, useEffect } from "react";
import { ICustomer, ICustomerPOST } from "src/types/customer";
// Sections
import AddressDetails from "./AddressDetails";
import CustomerInformation from "./CustomerInformation";
import NotesSection from "./NotesSection";
// Forms
import { FormProvider } from "react-hook-form";
import { ICustomerYup } from "./types";
import useCustomerForm from "./useCustomerForm";

interface FormProps {
    compact?: boolean;

    customer?: ICustomer;
    isLoading: boolean;
    isError: boolean;
    onSave: (body: ICustomerPOST) => Promise<any | { error: "" }>;
    onSaveSuccess?: VoidFunction;
    onCancel: () => void;
}
const COLUMN_GRID = (compact: boolean) =>
    compact
        ? {
              lg: 12,
          }
        : {};

const Form: FC<FormProps> = ({
    compact = false,

    customer,
    isLoading,
    isError,

    onSave,
    onSaveSuccess = null,
    onCancel,
}) => {
    const { t } = useTranslation();

    const { methods, PersistNotice } = useCustomerForm(customer, onSaveSuccess);

    const isDirty = methods.formState.isDirty;

    // INFO: this is a nested-form so make sure we do not use the type="submit" method because it triggers a submit event to the parent form aswell
    const handleSubmit = methods.handleSubmit(async (data: ICustomerYup) => {
        const res = await onSave({
            ...(data as ICustomerPOST),
            // TODO: see if this can be done cleaner (and change managedBy to just ?: number)
            managedBy: (data?.managedBy as number) || undefined,
            nationality: data?.nationality || undefined,
            preferredLanguage: data?.preferredLanguage || undefined,
            leadSource: data?.leadSource || undefined,
        });

        if ("error" in res) return false;

        return true;
    });

    const handleClear = useCallback(() => methods.reset(), []);

    return (
        <form>
            <FormProvider {...methods}>
                {PersistNotice ? PersistNotice : null}

                <Grid container paddingTop={1} paddingRight={1} spacing={1}>
                    <Grid item xs={12} lg={6} {...COLUMN_GRID(compact)}>
                        <CustomerInformation />
                    </Grid>
                    <Grid item xs={12} lg={6} {...COLUMN_GRID(compact)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <AddressDetails />
                            </Grid>
                            <Grid item xs={12}>
                                <NotesSection isEditMode={!!customer} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Stack
                    my={2}
                    display="flex"
                    justifyContent="flex-end"
                    direction="row"
                    spacing={1}
                    sx={{
                        bgcolor: "background.neutral",
                        width: "100%",
                        p: 0.5,
                        alignSelf: "flex-end",
                        borderRadius: "10px",
                        position: "sticky",
                        zIndex: 1000,
                        bottom: 0,
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={handleClear}
                    >
                        {t("Clear")}
                    </Button>

                    <LoadingButton
                        disabled={!isDirty}
                        loading={isLoading && !isError}
                        variant="contained"
                        startIcon={<SendIcon />}
                        onClick={handleSubmit}
                    >
                        {t("Save")}
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </form>
    );
};

export default Form;
