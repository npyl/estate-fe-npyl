import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { RHFTextField } from "@/components/hook-form";
import { useUpdateIntegrationsMutation } from "@/services/company";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Dialog from "@/components/Dialog";

interface IRightMovePOST {
    branchId: number;
}

const Schema = Yup.object().shape({
    branchId: Yup.number().min(0).required(),
});

interface FormProps {
    onClose: () => void;
}

const EditDialog: React.FC<FormProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const methods = useForm<IRightMovePOST>({
        values: {
            branchId: -1,
        },
        resolver: yupResolver(Schema),
    });

    const [updateIntegrations] = useUpdateIntegrationsMutation();

    const onSubmit = async (d: IRightMovePOST) => {
        await updateIntegrations(d);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <Dialog
                open
                onClose={onClose}
                maxWidth="lg"
                fullWidth
                // ...
                submit
                onSubmit={methods.handleSubmit(onSubmit)}
                //  ...
                title={`${t("Edit Integration Details")}`}
                content={
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <RHFTextField
                                fullWidth
                                label="Branch Id"
                                name="branchId"
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                }
                actions={
                    <>
                        <Button onClick={onClose} color="secondary">
                            {t("Cancel")}
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {t("Save")}
                        </LoadingButton>
                    </>
                }
            />
        </FormProvider>
    );
};

export default EditDialog;
