import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ICustomer, ICustomerPOST } from "src/types/customer";
// Sections
import AddressDetails from "./AddressDetails";
import CustomerInformation from "./CustomerInformation";
import NotesSection from "./NotesSection";
// Forms
import { FormProvider } from "react-hook-form";
import { ICustomerYup } from "./types";
import useCustomerForm from "./useCustomerForm";
import FormBottomBar from "@/sections/FormBottomBar";
import SaveButton from "./SaveButton";

const COLUMN_GRID = (compact: boolean) =>
    compact
        ? {
              lg: 12,
          }
        : {};

interface CustomerFormProps {
    quickCreate?: boolean;
    compact?: boolean;

    customer?: ICustomer;
    isLoading?: boolean;
    isError?: boolean;
    onSave: (body: ICustomerPOST) => Promise<{ data: number } | { error: any }>;
    onSaveSuccess?: VoidFunction;
    onCancel: () => void;
}

const Form: FC<CustomerFormProps> = ({
    quickCreate = false,
    compact = false,

    customer,
    isLoading = false,
    isError = false,

    onSave,
    onSaveSuccess = null,
    onCancel,
}) => {
    const { t } = useTranslation();

    const { methods, PersistNotice } = useCustomerForm(
        quickCreate,
        customer,
        onSaveSuccess
    );

    // INFO: this is a nested-form so make sure we do not use the type="submit" method because it triggers a submit event to the parent form aswell
    const handleSubmit = methods.handleSubmit(async (data: ICustomerYup) => {
        const res = await onSave(data as ICustomerPOST);

        if ("error" in res) return false;

        return true;
    });

    return (
        <form>
            <FormProvider {...methods}>
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

                <FormBottomBar
                    contentLeft={PersistNotice}
                    contentRight={
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Button
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                onClick={onCancel}
                            >
                                {t("Cancel")}
                            </Button>

                            <SaveButton
                                quickCreate={quickCreate}
                                loading={isLoading}
                                error={isError}
                                onClick={handleSubmit}
                            />
                        </Stack>
                    }
                />
            </FormProvider>
        </form>
    );
};

export type { CustomerFormProps };
export default Form;
