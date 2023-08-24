import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface FeaturesProps {
    data: IProperties;
}

const Features: React.FC<FeaturesProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const features = data?.features;
    if (!data || !features) return null;

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
                <Typography variant="h6">{t("Features")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Panoramic View")}
                            status={features?.panoramicView}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Drilling")}
                            status={features?.drilling}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Sea View")}
                            status={features?.seaView}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Thermal Insulation")}
                            status={features?.thermalInsulation}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Quiet Area")}
                            status={features?.quietArea}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Guestroom")}
                            status={features?.guestroom}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Sound Insulation")}
                            status={features?.soundInsulation}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Access For Disabled")}
                            status={features?.accessForDisabled}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Has 24h Security")}
                            status={features?.has24HoursSecurity}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("IndoorPool")}
                            status={features?.indoorPool}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Veranda")}
                            status={features?.veranda}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Masonry Fence")}
                            status={features?.masonryFence}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Independent Heating Per Room")}
                            status={features?.independentHeatingPerRoom}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Corner")}
                            status={features?.corner}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Organized Garden")}
                            status={features?.organizedGarden}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Adapting To The Ground")}
                            status={features?.adaptingToTheGround}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Barbeque")}
                            status={features?.barbeque}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Mountain View")}
                            status={features?.mountainView}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("SmartHome")}
                            status={features?.smartHome}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Jacuzzi")}
                            status={features?.jacuzzi}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Walkable Distance To Beach")}
                            status={features?.walkableDistanceToBeach}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Bright")}
                            status={features?.bright}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Near Bus Route")}
                            status={features?.nearBusRoute}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Office")}
                            status={features?.office}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Combined Kitchen And Dining Area")}
                            status={features?.combinedKitchenAndDiningArea}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Facade")}
                            status={features?.facade}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Pool")}
                            status={features?.pool}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Sea Front")}
                            status={features?.seaFront}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Internet")}
                            status={features?.internet}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("View")}
                            status={features?.view}
                            align="horizontal"
                        />

                        <ListBooleanItem
                            label={t("HomeCinema")}
                            status={features?.homeCinema}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Well")}
                            status={features?.well}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Heated Pool")}
                            status={features?.heatedPool}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Fire Detector")}
                            status={features?.fireDetector}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Tents")}
                            status={features?.tents}
                            align="horizontal"
                        />

                        <ListBooleanItem
                            label={t("CCTV")}
                            status={features?.cctv}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Features;
