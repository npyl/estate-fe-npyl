import React, { forwardRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ICompany, ICompanyPOST } from "src/types/company";
import { RHFTextField, RHFTextFieldMultiline } from "@/components/hook-form";
import { useUpdateCompanyDetailsMutation } from "@/services/company";
import { LoadingButton } from "@mui/lab";

const DialogForm = forwardRef<HTMLFormElement>((props, ref) => (
    <form ref={ref} {...props} method="POST" />
));

DialogForm.displayName = "DialogForm";

interface FormProps {
    open: boolean;
    onClose: () => void;
    initialValues: ICompany;
}

const EditDialog: React.FC<FormProps> = ({ open, onClose, initialValues }) => {
    const { t } = useTranslation();

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required(
            t<string>("Company Name is required")
        ),
        city: Yup.string().required(t<string>("City is required")),
        address: Yup.string().required(t<string>("Address is required")),
        email: Yup.string()
            .email(t<string>("Email is invalid"))
            .required(t<string>("Email is required")),
        fixedTelephones: Yup.array()
            .of(Yup.string().required(t<string>("Fixed Telephone is required")))
            .required(t<string>("Fixed Telephones are required")),
        phoneNumbers: Yup.array()
            .of(Yup.string().required(t<string>("Phone Number is required")))
            .required(t<string>("Phone Numbers are required")),
        faxNumber: Yup.string().required(t<string>("Fax Number is required")),
        website: Yup.string()
            .url(t<string>("Website is invalid"))
            .required(t<string>("Website is required")),
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

        includeWatermark: Yup.boolean().notRequired(),
    });

    const methods = useForm<ICompanyPOST>({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema) as any, // TODO;: fixs
    });

    const [updateCompanyDetails, { isLoading }] =
        useUpdateCompanyDetailsMutation();

    const onSubmit = async (data: ICompanyPOST) => {
        try {
            await updateCompanyDetails(data).unwrap();
            onClose();
        } catch (updateError) {
            console.error("Update failed", updateError);
        }
    };

    return (
        <FormProvider {...methods}>
            <Dialog
                component={DialogForm}
                onSubmit={methods.handleSubmit(onSubmit)}
                open={open}
                onClose={onClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>{t("Edit Company Information")}</DialogTitle>
                <DialogContent>
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
                            <RHFTextField
                                fullWidth
                                label={t("Fixed Telephone")}
                                name="fixedTelephones[0]"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label={t("Phone Number")}
                                name="phoneNumbers[0]"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label={t("Fax Number")}
                                name="faxNumber"
                                margin="normal"
                            />
                            <RHFTextField
                                fullWidth
                                label={t("Website")}
                                name="website"
                                margin="normal"
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...methods.register(
                                            "includeWatermark"
                                        )}
                                    />
                                }
                                label={t("Include Watermarks")}
                            />
                            <RHFTextField
                                fullWidth
                                select
                                label={t("Position of Watermark")}
                                name="watermarkPosition"
                                margin="normal"
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
                            </RHFTextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        {t("Cancel")}
                    </Button>
                    <LoadingButton
                        loading={isLoading}
                        disabled={isLoading}
                        type="submit"
                        color="primary"
                    >
                        {t("Save Changes")}
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </FormProvider>
    );
};

export default EditDialog;
