import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";

interface TechnicalFeaturesProps {
    data: IProperties;
}

const TechnicalFeatures: React.FC<TechnicalFeaturesProps> = (props) => {
    const { data } = props;
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
                <Typography variant="h6">Technical Details</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={4}>
                    <List>
                        <ListItem
                            label="Entrances"
                            value={technicalFeatures?.entrances}
                            align="horizontal"
                        />
                        <ListItem
                            label="Display Windows Length"
                            value={technicalFeatures?.displayWindowsLength}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Safety Door"
                            status={technicalFeatures?.safetyDoor}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Alarm System"
                            status={technicalFeatures?.alarmSystem}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Painted"
                            status={technicalFeatures?.painted}
                            align="horizontal"
                        />
                        <ListItem
                            label="Furnished"
                            value={technicalFeatures?.furnished}
                            align="horizontal"
                        />
                        <ListItem
                            label="Frame Type"
                            value={technicalFeatures?.frameType}
                            align="horizontal"
                        />
                        <ListItem
                            label="Pane Glass Type"
                            value={technicalFeatures?.paneGlassType}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Window Screens"
                            status={technicalFeatures?.windowScreens}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label="Fireplace"
                            status={technicalFeatures?.fireplace}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Bright"
                            status={technicalFeatures?.bright}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Luxurious"
                            status={technicalFeatures?.luxurious}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Electric Car Charging Facilities"
                            status={
                                technicalFeatures?.electricCarChargingFacilities
                            }
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Reception"
                            status={technicalFeatures?.reception}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Pets Allowed"
                            status={technicalFeatures?.petsAllowed}
                            align="horizontal"
                        />
                        <ListItem
                            label="Floor Type"
                            value={technicalFeatures?.floorType}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Satellite TV"
                            status={technicalFeatures?.satelliteTV}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Wiring"
                            status={technicalFeatures?.wiring}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label="Loading - Unloading Elevator"
                            status={technicalFeatures?.loadingUnloadingElevator}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="False Ceiling"
                            status={technicalFeatures?.falseCeiling}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="With Equipment"
                            status={technicalFeatures?.withEquipment}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Double Frontage"
                            status={technicalFeatures?.doubleFrontage}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Consideration"
                            status={technicalFeatures?.consideration}
                            align="horizontal"
                        />

                        <ListItem
                            label="Floor to Area Ratio"
                            value={technicalFeatures?.floorToAreaRatio}
                            align="horizontal"
                        />
                        <ListItem
                            label="Coverage Factor"
                            value={technicalFeatures?.coverageFactor}
                            align="horizontal"
                        />
                        <ListItem
                            label="Facade Length"
                            value={technicalFeatures?.facadeLength}
                            align="horizontal"
                        />
                        <ListItem
                            label="Inclination"
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
