import { Box, Divider, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CheckboxItem from "../components/CheckboxItem";
import { IFeatureSectionProps } from "./types";

const FeaturesForCommercialSection = ({
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
                    {t("Features for Commercial Category")}
                </Typography>
            </Box>
            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
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
                            label={t("Has 24 Hours Security")}
                            value={!!features?.has24HoursSecurity}
                            sliceKey={"has24HoursSecurity"}
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
                            label={t("Access for Disabled")}
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
                            label={t("Bright")}
                            value={!!features?.bright}
                            sliceKey={"bright"}
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
                </Grid>
            </Grid>
        </>
    );
};
export default FeaturesForCommercialSection;
