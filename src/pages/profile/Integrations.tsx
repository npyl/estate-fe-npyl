import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

const Integrations: React.FC = () => {
    const { t } = useTranslation();

    // State management for Spitogatos Network
    const [spitogatos, setSpitogatos] = useState({
        brokerId: "",
        username: "",
        password: "",
    });

    // State management for Xrisi Efkeria Network
    const [xrisiEfkeria, setXrisiEfkeria] = useState({
        agentId: "",
        username: "",
        password: "",
        authToken: "",
        certifiedTel: "",
    });

    const handleSpitogatosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpitogatos({ ...spitogatos, [e.target.name]: e.target.value });
    };

    const handleXrisiEfkeriaChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setXrisiEfkeria({ ...xrisiEfkeria, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        const integrations = { spitogatos, xrisiEfkeria };

        // Save the integrations object as needed
        console.log(integrations);
    };

    return (
        <Box p={3}>
            <Typography variant="h6">{t("Integrations")}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {t("Spitogatos Network")}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={t("Broker ID")}
                        name="brokerId"
                        value={spitogatos.brokerId}
                        onChange={handleSpitogatosChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label={t("Username")}
                        name="username"
                        value={spitogatos.username}
                        onChange={handleSpitogatosChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label={t("Password")}
                        name="password"
                        value={spitogatos.password}
                        onChange={handleSpitogatosChange}
                        margin="normal"
                        type="password"
                    />
                </Grid>
            </Grid>

            <Typography variant="subtitle1" sx={{ mt: 4 }}>
                {t("Xrisi Efkeria Network")}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label={t("Agent ID")}
                        name="agentId"
                        value={xrisiEfkeria.agentId}
                        onChange={handleXrisiEfkeriaChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label={t("Username")}
                        name="username"
                        value={xrisiEfkeria.username}
                        onChange={handleXrisiEfkeriaChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label={t("Password")}
                        name="password"
                        value={xrisiEfkeria.password}
                        onChange={handleXrisiEfkeriaChange}
                        margin="normal"
                        type="password"
                    />
                    <TextField
                        fullWidth
                        label={t("Auth Token")}
                        name="authToken"
                        value={xrisiEfkeria.authToken}
                        onChange={handleXrisiEfkeriaChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label={t("Certified Telephone Number")}
                        name="certifiedTel"
                        value={xrisiEfkeria.certifiedTel}
                        onChange={handleXrisiEfkeriaChange}
                        margin="normal"
                    />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                fullWidth
                style={{ marginTop: "20px" }}
            >
                {t("Save")}
            </Button>
        </Box>
    );
};

export default Integrations;
