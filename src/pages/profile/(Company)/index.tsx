import React from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetCompanyDetailsQuery } from "src/services/company";
import useDialog from "@/hooks/useDialog";
import EditDialog from "./EditDialog";
import { List, ListBooleanItem, ListItem } from "src/components/List";
import { SpaceBetween } from "@/components/styled";
import SoftButton from "@/components/SoftButton";
import Stack from "@mui/material/Stack";
import UploadImage from "./UploadImage";

const CompanyInformation: React.FC = () => {
    const { t } = useTranslation();

    const { data: companyDetails, isLoading } = useGetCompanyDetailsQuery();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    if (isLoading) {
        return <Typography>{t("Loading...")}</Typography>;
    }

    return (
        <Paper elevation={10}>
            <SpaceBetween
                sx={{
                    px: 2,
                    py: 1.5,
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">{t("Company Information")}</Typography>
                <SoftButton variant="contained" onClick={openDialog}>
                    {t("Edit")}
                </SoftButton>
            </SpaceBetween>
            <Divider />
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={1}
                width={1}
                p={1}
                justifyContent="center"
                alignItems="center"
            >
                <UploadImage
                    label={t("Logo")}
                    src={companyDetails?.companyImages?.LOGO || ""}
                    variant="LOGO"
                />
                <UploadImage
                    label={t("Watermark")}
                    src={companyDetails?.companyImages?.WATERMARK || ""}
                    variant="WATERMARK"
                />
            </Stack>
            <Grid container>
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
                            label={t("Fixed Telephone(s)")}
                            value={
                                companyDetails?.fixedTelephones.join(", ") || ""
                            }
                        />
                        <ListItem
                            label={t("Phone Number(s)")}
                            value={
                                companyDetails?.phoneNumbers.join(", ") || ""
                            }
                        />
                    </List>
                </Grid>
            </Grid>
            <Divider />
            <Grid container>
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
            <Grid container>
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
                        <ListBooleanItem
                            label={t("Include Watermark")}
                            status={!!companyDetails?.includeWatermark}
                        />
                        <ListItem
                            label={t("Position of Watermark")}
                            value={companyDetails?.watermarkPosition || ""}
                        />
                    </List>
                </Grid>
            </Grid>

            {isDialogOpen ? (
                <EditDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    initialValues={companyDetails}
                />
            ) : null}
        </Paper>
    );
};

export default CompanyInformation;
