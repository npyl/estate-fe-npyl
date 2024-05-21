import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
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
import { ICompanyPOST } from "src/types/company";
import { RHFTextField } from "@/components/hook-form";

interface FormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ICompanyPOST) => void;
    initialValues: ICompanyPOST;
}

const EditDialog: React.FC<FormProps> = ({
    open,
    onClose,
    onSubmit,
    initialValues,
}) => {
    const { t } = useTranslation();

    const methods = useForm<ICompanyPOST>({
        defaultValues: initialValues,
    });

    useEffect(() => {
        methods.reset(initialValues);
    }, [initialValues, methods]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Dialog open={open} onClose={onClose} maxWidth="lg">
                    <DialogTitle>{t("Edit Company Information")}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
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
                                <RHFTextField
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
                        <Button type="submit" color="primary">
                            {t("Save Changes")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </FormProvider>
    );
};

export default EditDialog;
