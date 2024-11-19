import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Grid, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ICompany, ICompanyPOST } from "src/types/company";
import {
    RHFCheckbox,
    RHFSelect,
    RHFTextField,
    RHFTextFieldMultiline,
} from "@/components/hook-form";
import { useUpdateCompanyDetailsMutation } from "@/services/company";
import { LoadingButton } from "@mui/lab";
import { TranslationType } from "@/types/translation";
import Multiple from "./Multiple";
import Dialog from "@/components/Dialog";

const getSchema = (t: TranslationType) =>
    Yup.object().shape({
        companyName: Yup.string().required(
            t<string>("Company Name is required")
        ),
        city: Yup.string().required(t<string>("City is required")),
        address: Yup.string().required(t<string>("Address is required")),
        email: Yup.string()
            .email(t<string>("Email is invalid"))
            .required(t<string>("Email is required")),
        fixedTelephones: Yup.array()
            .of(Yup.string())
            .required(t<string>("Fixed Telephones are required")),
        phoneNumbers: Yup.array()
            .of(Yup.string())
            .required(t<string>("Phone Numbers are required")),
        description: Yup.string().required(
            t<string>("Description is required")
        ),

        skype: Yup.string().notRequired(),
        facebook: Yup.string()
            .url(t<string>("Facebook is invalid"))
            .notRequired(),
        tiktok: Yup.string().url(t<string>("Tiktok is invalid")).notRequired(),
        instagram: Yup.string()
            .url(t<string>("Instagram is invalid"))
            .notRequired(),
        linkedIn: Yup.string()
            .url(t<string>("LinkedIn is invalid"))
            .notRequired(),
        twitter: Yup.string()
            .url(t<string>("Twitter is invalid"))
            .notRequired(),
        youtube: Yup.string()
            .url(t<string>("Youtube is invalid"))
            .notRequired(),
        googlePlus: Yup.string()
            .url(t<string>("Google+ is invalid"))
            .notRequired(),
        includeWatermark: Yup.boolean().notRequired(),

        watermarkPosition: Yup.string()
            .oneOf(
                [
                    "CENTER",
                    "DOWN_RIGHT",
                    "DOWN_CENTER",
                    "DOWN_LEFT",
                    "UP_RIGHT",
                    "UP_CENTER",
                    "UP_LEFT",
                ],
                t<string>("Invalid watermark position")
            )
            .required(t<string>("Watermark Position is required")),
    });

interface FormProps {
    open: boolean;
    onClose: () => void;
    initialValues?: ICompany;
}

const EditDialog: React.FC<FormProps> = ({ open, onClose, initialValues }) => {
    const { t } = useTranslation();

    const validationSchema = useMemo(() => getSchema(t), [t]);

    const methods = useForm<ICompanyPOST>({
        values: {
            companyName: initialValues?.companyName || "",
            address: initialValues?.address || "",
            city: initialValues?.city || "",
            email: initialValues?.email || "",
            fixedTelephones: initialValues?.fixedTelephones || [],
            phoneNumbers: initialValues?.phoneNumbers || [],
            description: initialValues?.description || "",

            watermarkPosition: initialValues?.watermarkPosition ?? "CENTER",

            facebook: initialValues?.facebook || "",
            googlePlus: initialValues?.googlePlus || "",
            instagram: initialValues?.instagram || "",
            linkedIn: initialValues?.linkedIn || "",
            skype: initialValues?.skype || "",
            tiktok: initialValues?.tiktok || "",
            twitter: initialValues?.twitter || "",
            youtube: initialValues?.youtube || "",
        },
        resolver: yupResolver(validationSchema) as any, // TODO: fix this
    });

    const [updateCompanyDetails, { isLoading }] =
        useUpdateCompanyDetailsMutation();

    const onSubmit = async (data: ICompanyPOST) => {
        await updateCompanyDetails(data);
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
                // ...
                title={t("Edit Company Information")}
                content={
                    <Grid container spacing={3} py={1}>
                        <Grid item xs={12} sm={6}>
                            <RHFTextField
                                fullWidth
                                label={t("Company Name")}
                                name="companyName"
                            />
                            <RHFTextField
                                fullWidth
                                label={t("City")}
                                name="city"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label={t("Address")}
                                name="address"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label={t("Email Address")}
                                name="email"
                                margin="normal"
                            />

                            <Multiple
                                label={t("Fixed Telephone(s)")}
                                name="fixedTelephones"
                            />
                            <Multiple
                                label={t("Phone Number(s)")}
                                name="phoneNumbers"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RHFTextFieldMultiline
                                fullWidth
                                label={t("Description")}
                                name="description"
                                margin="normal"
                                multiline
                                rows={4}
                            />
                            <RHFTextField
                                fullWidth
                                label="Skype"
                                name="skype"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label="Facebook"
                                name="facebook"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label="Tiktok"
                                name="tiktok"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label="Instagram"
                                name="instagram"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label="LinkedIn"
                                name="linkedIn"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label="Twitter"
                                name="twitter"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label="Youtube"
                                name="youtube"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label="Google +"
                                name="googlePlus"
                                margin="normal"
                            />

                            <RHFCheckbox
                                name="includeWatermark"
                                label={t("Include Watermarks")}
                            />

                            <RHFSelect
                                fullWidth
                                label={t("Position of Watermark")}
                                name="watermarkPosition"
                            >
                                <MenuItem value="CENTER">
                                    {t("Center")}
                                </MenuItem>
                                <MenuItem value="DOWN_RIGHT">
                                    {t("Down and right")}
                                </MenuItem>
                                <MenuItem value="DOWN_CENTER">
                                    {t("Down and center")}
                                </MenuItem>
                                <MenuItem value="DOWN_LEFT">
                                    {t("Down and left")}
                                </MenuItem>
                                <MenuItem value="UP_RIGHT">
                                    {t("Up and right")}
                                </MenuItem>
                                <MenuItem value="UP_CENTER">
                                    {t("Up and center")}
                                </MenuItem>
                                <MenuItem value="UP_LEFT">
                                    {t("Up and left")}
                                </MenuItem>
                            </RHFSelect>
                        </Grid>
                    </Grid>
                }
                actions={
                    <>
                        <Button onClick={onClose} color="secondary">
                            {t("Cancel")}
                        </Button>
                        <LoadingButton
                            loading={isLoading}
                            disabled={isLoading}
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
