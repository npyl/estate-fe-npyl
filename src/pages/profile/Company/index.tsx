import React from "react";
import {
    Avatar,
    Box,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetCompanyDetailsQuery } from "src/services/company";
import useDialog from "@/hooks/useDialog";
import EditDialog from "./EditDialog";
import { List, ListItem } from "src/components/List";
import { Label } from "@/components/Label";

const CompanyInformation: React.FC = () => {
    const { t } = useTranslation();
    const {
        data: companyDetails,
        isLoading,
        isError,
        error,
    } = useGetCompanyDetailsQuery();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    if (isLoading) {
        return <Typography>{t("Loading...")}</Typography>;
    }

    if (isError) {
        return <Typography>{t("Failed to load company details")}</Typography>;
    }

    return (
        <Paper elevation={10} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">{t("Company Information")}</Typography>
                <Button variant="contained" onClick={openDialog}>
                    {t("Edit")}
                </Button>
            </Box>
            <Divider />

            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Company Name")}
                            value={companyDetails?.companyName || ""}
                        />
                        <ListItem
                            label={t("City")}
                            value={companyDetails?.city || ""}
                        />
                        <ListItem
                            label={t("Address")}
                            value={companyDetails?.address || ""}
                        />
                        <ListItem
                            label={t("Email")}
                            value={companyDetails?.email || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Fixed Telephone")}
                            value={companyDetails?.fixedTelephones[0] || ""}
                        />
                        <ListItem
                            label={t("Phone Number")}
                            value={companyDetails?.phoneNumbers[0] || ""}
                        />
                        <ListItem
                            label={t("Fax Number")}
                            value={companyDetails?.faxNumber || ""}
                        />
                        <ListItem
                            label={t("Website")}
                            value={companyDetails?.website || ""}
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List>
                        <ListItem
                            label={t("Description")}
                            value={companyDetails?.description || ""}
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Skype")}
                            value={companyDetails?.skype || ""}
                        />
                        <ListItem
                            label={t("Facebook")}
                            value={companyDetails?.facebook || ""}
                        />
                        <ListItem
                            label={t("Tiktok")}
                            value={companyDetails?.tiktok || ""}
                        />
                        <ListItem
                            label={t("Instagram")}
                            value={companyDetails?.instagram || ""}
                        />
                        <ListItem
                            label={t("LinkedIn")}
                            value={companyDetails?.linkedIn || ""}
                        />
                        <ListItem
                            label={t("Twitter")}
                            value={companyDetails?.twitter || ""}
                        />
                        <ListItem
                            label={t("Youtube")}
                            value={companyDetails?.youtube || ""}
                        />
                        <ListItem
                            label={t("Google +")}
                            value={companyDetails?.googlePlus || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Include Watermark")}
                            value={
                                companyDetails?.includeWatermark
                                    ? t("Yes")
                                    : t("No")
                            }
                        />
                        <ListItem
                            label={t("Position of Watermark")}
                            value={companyDetails?.watermarkPosition || ""}
                        />
                    </List>
                </Grid>
            </Grid>
            {isDialogOpen && companyDetails && (
                <EditDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    initialValues={companyDetails}
                />
            )}
        </Paper>
    );
};

export default CompanyInformation;
