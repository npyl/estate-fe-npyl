import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListItem, ListBooleanItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface HeatingSectionProps {
    data: IProperties;
}

const HeatingSection: React.FC<HeatingSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    if (!data) return null;
    const heating = data?.heatingAndEnergy;
    if (!heating) return null;

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Heating and Energy")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={6}>
                    <List>
                        <ListItem
                            label={t("Energy Class")}
                            value={heating?.energyClass}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Heating Type")}
                            value={heating?.heatingType}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Heating System")}
                            value={heating?.heatingSystem}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Electricity Type")}
                            value={heating?.electricityType}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListBooleanItem
                            label={t("Floor Heating")}
                            status={heating?.floorHeating}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Air Conditioning")}
                            status={heating?.airConditioning}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Solar Boiler")}
                            status={heating?.solarBoiler}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Off Peak Electricity")}
                            status={heating?.offPeakElectricity}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default HeatingSection;
