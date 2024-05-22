import React, { useState } from "react";
import { Typography, Grid, Paper, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import EditDialog from "./EditDialog";
import { useGetIntegrationsQuery } from "src/services/company";
import { IIntegration } from "src/types/integrations";
import { List, ListItem } from "src/components/List";
import { SoftButton } from "@/components/SoftButton";
import { SpaceBetween } from "@/components/styled";

const Integrations: React.FC = () => {
    const { t } = useTranslation();

    const { data: integration, isLoading } =
        useGetIntegrationsQuery("SPITOGATOS");

    const [selectedIntegration, setSelectedIntegration] =
        useState<IIntegration>();

    const handleCloseDialog = () => {
        setSelectedIntegration(undefined);
    };

    if (isLoading) {
        return <Typography>{t("Loading...")}</Typography>;
    }

    return (
        <>
            <Paper elevation={10}>
                <SpaceBetween
                    sx={{
                        px: 2,
                        py: 1.5,
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">
                        {t(`${integration?.site} Integration`)}
                    </Typography>
                    <SoftButton
                        variant="contained"
                        onClick={() => setSelectedIntegration(integration)}
                    >
                        {t("Edit")}
                    </SoftButton>
                </SpaceBetween>
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
                    initialValues={selectedIntegration}
                />
            ) : null}
        </>
    );
};

export default Integrations;
