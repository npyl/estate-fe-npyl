import { Grid, Paper, Stack, Typography } from "@mui/material";
import Left from "./Left";
import Right from "./Right";
import { useTranslation } from "react-i18next";
import GoogleEarth from "./GoogleEarth";

const Integrations = () => {
    const { t } = useTranslation();

    return (
        <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%" }}
        >
            <Grid item xs={12} sm={6}>
                <Left />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Right />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper
                    elevation={10}
                    component={Stack}
                    p={2}
                    alignItems="center"
                >
                    <Typography variant="h4">
                        {t("Upload Google Earth")}
                    </Typography>
                    <GoogleEarth />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Integrations;
