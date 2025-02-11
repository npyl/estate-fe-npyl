import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckboxItem from "../components/CheckboxItem";
import { IFeatureSectionProps } from "./types";

const FeaturesSection = ({
    features,
    onChange: handleChange,
}: IFeatureSectionProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Divider
                style={{
                    width: "100%",
                }}
            />

            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">
                    {t("Features for Residential Category")}
                </Typography>
            </Box>
            <Divider sx={{ height: "1px", backgroundColor: "black", my: 2 }} />

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Panoramic View")}
                            value={!!features?.panoramicView}
                            sliceKey={"panoramicView"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Smart Home")}
                            value={!!features?.smartHome}
                            sliceKey={"smartHome"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Organized Garden")}
                            value={!!features?.organizedGarden}
                            sliceKey={"organizedGarden"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Alarm System")}
                            value={!!features?.alarmSystem}
                            sliceKey={"alarmSystem"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Sea View")}
                            value={!!features?.seaView}
                            sliceKey={"seaView"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Guestroom")}
                            value={!!features?.guestroom}
                            sliceKey={"guestroom"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Jacuzzi")}
                            value={!!features?.jacuzzi}
                            sliceKey={"jacuzzi"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Has 24 Hours Security")}
                            value={!!features?.has24HoursSecurity}
                            sliceKey={"has24HoursSecurity"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Mountain View")}
                            value={!!features?.mountainView}
                            sliceKey={"mountainView"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Office")}
                            value={!!features?.office}
                            sliceKey={"office"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Well")}
                            value={!!features?.well}
                            sliceKey={"well"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("CCTV")}
                            value={!!features?.cctv}
                            sliceKey={"cctv"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Sea Front")}
                            value={!!features?.seaFront}
                            sliceKey={"seaFront"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Home Cinema")}
                            value={!!features?.homeCinema}
                            sliceKey={"homeCinema"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Drilling")}
                            value={!!features?.drilling}
                            sliceKey={"drilling"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Internet")}
                            value={!!features?.internet}
                            sliceKey={"internet"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Walkable Distance to Beach")}
                            value={!!features?.walkableDistanceToBeach}
                            sliceKey={"walkableDistanceToBeach"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Combined Kitchen and Dinning Area")}
                            value={!!features?.combinedKitchenAndDiningArea}
                            sliceKey={"combinedKitchenAndDiningArea"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Masonry Fence")}
                            value={!!features?.masonryFence}
                            sliceKey={"masonryFence"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Fire Detector")}
                            value={!!features?.fireDetector}
                            sliceKey={"fireDetector"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Quiet Area")}
                            value={!!features?.quietArea}
                            sliceKey={"quietArea"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Sound Insulation")}
                            value={!!features?.soundInsulation}
                            sliceKey={"soundInsulation"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Access For Disabled")}
                            value={!!features?.accessForDisabled}
                            sliceKey={"accessForDisabled"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Independent Heating Per Room")}
                            value={!!features?.independentHeatingPerRoom}
                            sliceKey={"independentHeatingPerRoom"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Thermal Insulation")}
                            value={!!features?.thermalInsulation}
                            sliceKey={"thermalInsulation"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Adapting to the Ground")}
                            value={!!features?.adaptingToTheGround}
                            sliceKey={"adaptingToTheGround"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Pool")}
                            value={!!features?.pool}
                            sliceKey={"pool"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("View")}
                            value={!!features?.view}
                            sliceKey={"view"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Veranda")}
                            value={!!features?.veranda}
                            sliceKey={"veranda"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Tents")}
                            value={!!features?.tents}
                            sliceKey={"tents"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Barbeque")}
                            value={!!features?.barbeque}
                            sliceKey={"barbeque"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Corner")}
                            value={!!features?.corner}
                            sliceKey={"corner"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Facade")}
                            value={!!features?.facade}
                            sliceKey={"facade"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Heated Pool")}
                            value={!!features?.heatedPool}
                            sliceKey={"heatedPool"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Indoor Pool")}
                            value={!!features?.indoorPool}
                            sliceKey={"indoorPool"}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <CheckboxItem
                            label={t("Near Bus Route")}
                            value={!!features?.nearBusRoute}
                            sliceKey={"nearBusRoute"}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default FeaturesSection;
