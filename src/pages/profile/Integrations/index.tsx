import React, { useMemo, useState } from "react";
import { Box, Typography, Button, Grid, Paper, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditDialog from "./EditDialog";
import {
    useGetIntegrationsQuery,
    useUpdateIntegrationsMutation,
} from "src/services/company";
import { IIntegration, IIntegrationsPOST } from "src/types/integrations";
import { List, ListItem } from "src/components/List";

const Integrations: React.FC = () => {
    const { t } = useTranslation();

    const { data: integration, isLoading } =
        useGetIntegrationsQuery("SPITOGATOS");

    const [updateIntegrations] = useUpdateIntegrationsMutation();

    const [selectedIntegration, setSelectedIntegration] =
        useState<IIntegration>();

    const handleCloseDialog = () => {
        setSelectedIntegration(undefined);
    };

    const handleSaveChanges = async (updatedIntegration: IIntegrationsPOST) => {
        try {
            await updateIntegrations(updatedIntegration).unwrap();
            handleCloseDialog();
        } catch (error) {
            console.error("Failed to update integration details", error);
        }
    };

    if (isLoading) {
        return <Typography>{t("Loading...")}</Typography>;
    }

    return (
        <Box p={3}>
            <Typography variant="h6">{t("Integrations")}</Typography>
            <Paper key={integration?.site} elevation={10} sx={{ p: 3, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">
                        {t(`${integration?.site} Integration`)}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setSelectedIntegration(integration)}
                    >
                        {t("Edit")}
                    </Button>
                </Box>
                <Divider />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <List>
                            <ListItem
                                label={t("API Key")}
                                value={integration?.apiKey || ""}
                            />
                            <ListItem
                                label={t("App Key")}
                                value={integration?.appKey || ""}
                            />
                            <ListItem
                                label={t("Username")}
                                value={integration?.username || ""}
                            />
                            <ListItem
                                label={t("Password")}
                                value={integration?.password || ""}
                            />
                        </List>
                    </Grid>
                </Grid>
                <Divider />
            </Paper>
            {selectedIntegration ? (
                <EditDialog
                    open={!!selectedIntegration}
                    onClose={handleCloseDialog}
                    onSubmit={handleSaveChanges}
                    initialValues={selectedIntegration}
                />
            ) : null}
        </Box>
    );
};

export default Integrations;
