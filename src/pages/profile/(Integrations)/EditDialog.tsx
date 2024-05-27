import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { IIntegration, IIntegrationPOST } from "src/types/integrations";
import { RHFTextField } from "@/components/hook-form";
import { useUpdateIntegrationsMutation } from "@/services/company";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TranslationType } from "@/types/translation";
import Dialog from "@/components/Dialog";
import { IntegrationSite } from "@/types/listings";

const getSchema = (t: TranslationType, type?: IntegrationSite) =>
    Yup.object().shape({
        apiKey: Yup.string().required(t<string>("API Key is required")),
        appKey: Yup.string().required(t<string>("App Key is required")),
        username: Yup.string().required(t<string>("Username is required")),
        password: Yup.string().required(t<string>("Password is required")),
        site: Yup.string()
            .oneOf<IntegrationSite>([
                "FERIMMO",
                "JAMES_EDITION",
                "PLOT_GR",
                "RIGHT_MOVE",
                "SPITOGATOS",
                "XE",
            ])
            .required(t<string>("Site is required")),
    });

interface FormProps {
    open: boolean;
    initialValues?: IIntegration;
    onClose: () => void;
}

const EditDialog: React.FC<FormProps> = ({ open, initialValues, onClose }) => {
    const { t } = useTranslation();

    // Define Yup validation schema with type casting
    const validationSchema = useMemo(
        () => getSchema(t, initialValues?.site),
        [t, initialValues?.site]
    );

    const methods = useForm<IIntegrationPOST>({
        values: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const [updateIntegrations] = useUpdateIntegrationsMutation();

    const onSubmit = async (d: IIntegrationPOST) => {
        await updateIntegrations(d);
        onClose();
    };

    return (
        <FormProvider {...methods}>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="lg"
                fullWidth
                // ...
                submit
                onSubmit={methods.handleSubmit(onSubmit)}
                //  ...
                title={`${t("Edit Integration Details")} (${
                    initialValues?.site
                })`}
                content={
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
                                type="password"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label={t("Site")}
                                name="site"
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
