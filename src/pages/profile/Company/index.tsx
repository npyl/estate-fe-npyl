import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
    useGetCompanyDetailsQuery,
    useUpdateCompanyDetailsMutation,
} from "src/services/company";
import { ICompanyPOST } from "src/types/company";
import useDialog from "@/hooks/useDialog";
import EditDialog from "./EditDialog";

const CompanyInformation: React.FC = () => {
    const { t } = useTranslation();

    const { data: companyDetails } = useGetCompanyDetailsQuery();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();
    const [updateCompanyDetails] = useUpdateCompanyDetailsMutation();

    const handleSubmit = (data: ICompanyPOST) => {
        updateCompanyDetails(data);
        closeDialog();
    };

    return (
        <Box p={3}>
            <Typography variant="h6">{t("Company Information")}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        {companyDetails?.companyName}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={openDialog}>
                        {t("Edit")}
                    </Button>
                </Grid>
            </Grid>
            {isDialogOpen && companyDetails && (
                <EditDialog
                    open={isDialogOpen}
                    onClose={closeDialog}
                    onSubmit={handleSubmit}
                    initialValues={companyDetails}
                />
            )}
        </Box>
    );
};

export default CompanyInformation;
