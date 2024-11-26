import { Typography, Stack, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "src/components/List";
import Panel from "../Panel";

const SolarDetails = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1}>
            <Panel title={t("Current Installation")}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-around"
                    alignItems="center"
                    gap={1}
                    p={5}
                >
                    <Stack alignItems="center">
                        <Typography variant="body1">
                            {t("Panels count")}
                        </Typography>
                        <Skeleton
                            variant="circular"
                            width="70px"
                            height="70px"
                        />
                    </Stack>

                    <Stack alignItems="center">
                        <Typography variant="body1">
                            {t("Annual energy")}
                        </Typography>
                        <Skeleton
                            variant="circular"
                            width="70px"
                            height="70px"
                        />
                    </Stack>
                </Stack>
            </Panel>

            <Panel title={t("Maximum Gain Installation")}>
                <List>
                    <ListItem label={t("Max Panel Required")} />
                    <ListItem label={t("Panel Lifespan(Yrs)")} />
                    <ListItem label={t("Area(m²)")} />
                    <ListItem label={t("Max Sunshine Hours/Year")} />
                    <ListItem label={t("Carbon Offset Factor (kg/MWh)")} />
                    <ListItem label={t("Watts Per Panel")} />
                    <ListItem label={t("Panel Dimension(m)(Height x Width)")} />
                </List>
            </Panel>

            <Panel title={t("Sunniness Over Roof area")}>
                <Skeleton width="100%" height="300px" />
            </Panel>
        </Stack>
    );
};

export default SolarDetails;
