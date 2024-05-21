import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { IIntegration } from "src/types/integrations";

import { RHFTextField } from "@/components/hook-form";

interface FormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: IIntegration) => void;
    initialValues: IIntegration;
}

const EditDialog: React.FC<FormProps> = ({
    open,
    onClose,
    onSubmit,
    initialValues,
}) => {
    const { t } = useTranslation();

    const methods = useForm<IIntegration>({
        defaultValues: initialValues,
    });

    const { setValue, register, handleSubmit, reset } = methods;

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const validateAndSetValue = (name: keyof IIntegration) => (value: any) => {
        if (value === null || value === "null") {
            setValue(name, "0");
            return true;
        }
        return true;
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
                    <DialogTitle>{t("Edit Integration Details")}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <RHFTextField
                                    fullWidth
                                    label={t("API Key")}
                                    name="apiKey"
                                    margin="normal"
                                />
                                <RHFTextField
                                    fullWidth
                                    label={t("App Key")}
                                    name="appKey"
                                    margin="normal"
                                />
                                <RHFTextField
                                    fullWidth
                                    label={t("Username")}
                                    name="username"
                                    margin="normal"
                                />
                                <RHFTextField
                                    fullWidth
                                    label={t("Password")}
                                    name="password"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">
                            {t("Cancel")}
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {t("Save Changes")}
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </form>
        </FormProvider>
    );
};

export default EditDialog;
