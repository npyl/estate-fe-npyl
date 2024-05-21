import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetCompanyDetailsQuery } from "src/services/company";
import useDialog from "@/hooks/useDialog";
import EditDialog from "./EditDialog";

const CompanyInformation: React.FC = () => {
    const { t } = useTranslation();

    const {
        data: companyDetails,
        isLoading,
        isError,
        error,
    } = useGetCompanyDetailsQuery();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    console.log("Fetched company details:", companyDetails);

    if (isLoading) {
        return <Typography>{t("Loading...")}</Typography>;
    }

    if (isError) {
        return <Typography>{t("Failed to load company details")}</Typography>;
    }

    return (
        <Box p={3}>
            <Typography variant="h6">{t("Company Information")}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        {companyDetails?.companyName ||
                            t("No company information available")}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={openDialog}>
                        {t("Edit")}
                    </Button>
                </Grid>
            </Grid>
            {isDialogOpen && companyDetails ? (
                <EditDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    initialValues={companyDetails}
                />
            ) : null}
        </Box>
    );
};

export default CompanyInformation;
