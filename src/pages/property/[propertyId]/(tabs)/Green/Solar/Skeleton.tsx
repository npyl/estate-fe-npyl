import {
    Paper,
    Typography,
    Divider,
    Stack,
    Skeleton,
    Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "src/components/List";

const SolarDetails = () => {
    const { t } = useTranslation();

    return (
        <Paper elevation={10}>
            <Typography px={3} py={1.5} variant="h6">
                {t("Current Installation")}
            </Typography>
            <Divider />

            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-around"
                alignItems="center"
                gap={1}
                p={5}
            >
                <Stack alignItems="center">
                    <Typography variant="body1">{t("Panels count")}</Typography>
                    <Skeleton variant="circular" width="70px" height="70px" />
                </Stack>

                <Stack alignItems="center">
                    <Typography variant="body1">
                        {t("Annual energy")}
                    </Typography>
                    <Skeleton variant="circular" width="70px" height="70px" />
                </Stack>
            </Stack>

            <Divider />
            <Typography px={3} py={1.5} variant="h6">
                {t("Maximum Gain Installation")}
            </Typography>
            <Divider />

            <List>
                <ListItem label={t("Max Panel Required")} />
                <ListItem label={t("Panel Lifespan(Yrs)")} />
                <ListItem label={t("Area(m²)")} />
                <ListItem label={t("Max Sunshine Hours/Year")} />
                <ListItem label={t("Carbon Offset Factor (kg/MWh)")} />
                <ListItem label={t("Watts Per Panel")} />
                <ListItem label={t("Panel Dimension(m)(Height x Width)")} />
            </List>

            <Box px={3}>
                <Skeleton width="100%" height="300px" />
            </Box>
        </Paper>
    );
};

export default SolarDetails;
