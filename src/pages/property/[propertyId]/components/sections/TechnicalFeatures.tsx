import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface TechnicalFeaturesProps {
    data: IProperties;
}

const TechnicalFeatures: React.FC<TechnicalFeaturesProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const technicalFeatures = data?.technicalFeatures;
    if (!data || !technicalFeatures) return null;

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
                <Typography variant="h6">{t("Technical Details")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={4}>
                    <List>
                        <ListItem
                            label={t("Entrances")}
                            value={technicalFeatures?.entrances}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Display Windows Length")}
                            value={technicalFeatures?.displayWindowsLength}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Safety Door")}
                            status={technicalFeatures?.safetyDoor}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Alarm System")}
                            status={technicalFeatures?.alarmSystem}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Painted")}
                            status={technicalFeatures?.painted}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Furnished")}
                            value={technicalFeatures?.furnished}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Frame Type")}
                            value={technicalFeatures?.frameType}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Pane Glass Type")}
                            value={technicalFeatures?.paneGlassType}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Window Screens")}
                            status={technicalFeatures?.windowScreens}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Fireplace")}
                            status={technicalFeatures?.fireplace}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Bright")}
                            status={technicalFeatures?.bright}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Luxurious")}
                            status={technicalFeatures?.luxurious}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Electric Car Charging Facilities")}
                            status={
                                technicalFeatures?.electricCarChargingFacilities
                            }
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Reception")}
                            status={technicalFeatures?.reception}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Pets Allowed")}
                            status={technicalFeatures?.petsAllowed}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Floor Type")}
                            value={technicalFeatures?.floorType}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Satellite TV")}
                            status={technicalFeatures?.satelliteTV}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Wiring")}
                            status={technicalFeatures?.wiring}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Loading - Unloading Elevator")}
                            status={technicalFeatures?.loadingUnloadingElevator}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("False Ceiling")}
                            status={technicalFeatures?.falseCeiling}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("With Equipment")}
                            status={technicalFeatures?.withEquipment}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Double Frontage")}
                            status={technicalFeatures?.doubleFrontage}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Consideration")}
                            status={technicalFeatures?.consideration}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Floor to Area Ratio")}
                            value={technicalFeatures?.floorToAreaRatio}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Coverage Factor")}
                            value={technicalFeatures?.coverageFactor}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Facade Length")}
                            value={technicalFeatures?.facadeLength}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Inclination")}
                            value={technicalFeatures?.inclination}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TechnicalFeatures;
