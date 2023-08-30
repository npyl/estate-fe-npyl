import React from "react";
import { IProperties, ParentCategory } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface TechnicalFeaturesProps {
    data: IProperties;
}
const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    Residential: [
        "Furnished",
        "Frame Type",
        "Pane Glass Type",
        "Floor Type",
        "Safety Door",
        "Alarm System",
        "Painted",
        "Bright",
        "Window Screens",
        "Double Frontage",
        "Fireplace",
        "Luxurious",
        "Satellite TV",
        "Reception",
        "Pets Allowed",
        "Electric Car Charging Facilities",
    ],
    Commercial: [
        "Display Window Length",
        "Entrances",
        "Floor Type",
        "Safety Door",
        "Alarm System",
        "Painted",
        "Bright",
        "Window Screens",
        "Double Frontage",
        "Fireplace",
        "Luxurious",
        "Satellite TV",
        "Reception",
        "Pets Allowed",
        "Electric Car Charging Facilities",
        "Wiring",
        "Loading-Unloading Elevator",
    ],
    Land: [
        "Floor To Area Ratio",
        "Coverage Factor",
        "Facade Length",
        "Alarm System",
    ],
    Other: [
        "Safety Door",
        "Double Frontage",
        "Satellite TV",
        "Reception",
        "Pets Allowed",
        "Loading-Unloading Elevator",
        "False Ceiling",
        "With Eqipment",
        "Alarm System",
    ],
};
const TechnicalFeatures: React.FC<TechnicalFeaturesProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const technicalFeatures = data?.technicalFeatures;
    const renderThirdOfFields = (
        fields: string[],
        from: number,
        to: number
    ) => (
        <Grid item xs={4}>
            <List>
                {fields
                    .slice(from, to)
                    .map((field) => renderTechnicalFeatureItem(field))}
            </List>
        </Grid>
    );

    const technicalFeatures1 = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;

        const third = Math.ceil(fieldsForCategory.length / 3);

        return (
            <Grid container>
                {renderThirdOfFields(fieldsForCategory, 0, third)}
                {renderThirdOfFields(fieldsForCategory, third, 2 * third)}
                {renderThirdOfFields(
                    fieldsForCategory,
                    2 * third,
                    fieldsForCategory.length
                )}
            </Grid>
        );
    };
    const renderTechnicalFeatureItem = (field: string) => {
        switch (field) {
            case "Entrances":
                return (
                    <ListItem
                        label={t("Entrances")}
                        value={technicalFeatures?.entrances}
                        align="horizontal"
                    />
                );
            case "Display Windows Length":
                return (
                    <ListItem
                        label={t("Display Windows Length")}
                        value={technicalFeatures?.displayWindowsLength}
                        align="horizontal"
                    />
                );
            case "Safety Door":
                return (
                    <ListBooleanItem
                        label={t("Safety Door")}
                        status={technicalFeatures?.safetyDoor}
                        align="horizontal"
                    />
                );
            case "Alarm System":
                return (
                    <ListBooleanItem
                        label={t("Alarm System")}
                        status={technicalFeatures?.alarmSystem}
                        align="horizontal"
                    />
                );
            case "Painted":
                return (
                    <ListBooleanItem
                        label={t("Painted")}
                        status={technicalFeatures?.painted}
                        align="horizontal"
                    />
                );
            case "Furnished":
                return (
                    <ListItem
                        label={t("Furnished")}
                        value={technicalFeatures?.furnished}
                        align="horizontal"
                    />
                );
            case "Frame Type":
                return (
                    <ListItem
                        label={t("Frame Type")}
                        value={technicalFeatures?.frameType}
                        align="horizontal"
                    />
                );
            case "Pane Glass Type":
                return (
                    <ListItem
                        label={t("Pane Glass Type")}
                        value={technicalFeatures?.paneGlassType}
                        align="horizontal"
                    />
                );
            case "Window Screens":
                return (
                    <ListBooleanItem
                        label={t("Window Screens")}
                        status={technicalFeatures?.windowScreens}
                        align="horizontal"
                    />
                );
            case "Fireplace":
                return (
                    <ListBooleanItem
                        label={t("Fireplace")}
                        status={technicalFeatures?.fireplace}
                        align="horizontal"
                    />
                );
            case "Bright":
                return (
                    <ListBooleanItem
                        label={t("Bright")}
                        status={technicalFeatures?.bright}
                        align="horizontal"
                    />
                );
            case "Luxurious":
                return (
                    <ListBooleanItem
                        label={t("Luxurious")}
                        status={technicalFeatures?.luxurious}
                        align="horizontal"
                    />
                );
            case "Electric Car Charging Facilities":
                return (
                    <ListBooleanItem
                        label={t("Electric Car Charging Facilities")}
                        status={
                            technicalFeatures?.electricCarChargingFacilities
                        }
                        align="horizontal"
                    />
                );
            case "Reception":
                return (
                    <ListBooleanItem
                        label={t("Reception")}
                        status={technicalFeatures?.reception}
                        align="horizontal"
                    />
                );
            case "Pets Allowed":
                return (
                    <ListBooleanItem
                        label={t("Pets Allowed")}
                        status={technicalFeatures?.petsAllowed}
                        align="horizontal"
                    />
                );
            case "Floor Type":
                return (
                    <ListItem
                        label={t("Floor Type")}
                        value={technicalFeatures?.floorType}
                        align="horizontal"
                    />
                );

            case "Satellite TV":
                return (
                    <ListBooleanItem
                        label={t("Satellite TV")}
                        status={technicalFeatures?.satelliteTV}
                        align="horizontal"
                    />
                );

            case "Wiring":
                return (
                    <ListBooleanItem
                        label={t("Wiring")}
                        status={technicalFeatures?.wiring}
                        align="horizontal"
                    />
                );
            case "Loading - Unloading Elevator":
                return (
                    <ListBooleanItem
                        label={t("Loading - Unloading Elevator")}
                        status={technicalFeatures?.loadingUnloadingElevator}
                        align="horizontal"
                    />
                );
            case "False Ceiling":
                return (
                    <ListBooleanItem
                        label={t("False Ceiling")}
                        status={technicalFeatures?.falseCeiling}
                        align="horizontal"
                    />
                );
            case "With Equipment":
                return (
                    <ListBooleanItem
                        label={t("With Equipment")}
                        status={technicalFeatures?.withEquipment}
                        align="horizontal"
                    />
                );
            case "Double Frontage":
                return (
                    <ListBooleanItem
                        label={t("Double Frontage")}
                        status={technicalFeatures?.doubleFrontage}
                        align="horizontal"
                    />
                );
            case "Consideration":
                return (
                    <ListBooleanItem
                        label={t("Consideration")}
                        status={technicalFeatures?.consideration}
                        align="horizontal"
                    />
                );
            case "Floor to Area Ratio":
                return (
                    <ListItem
                        label={t("Floor to Area Ratio")}
                        value={technicalFeatures?.floorToAreaRatio}
                        align="horizontal"
                    />
                );
            case "Coverage Factor":
                return (
                    <ListItem
                        label={t("Coverage Factor")}
                        value={technicalFeatures?.coverageFactor}
                        align="horizontal"
                    />
                );
            case "Facade Length":
                return (
                    <ListItem
                        label={t("Facade Length")}
                        value={technicalFeatures?.facadeLength}
                        align="horizontal"
                    />
                );
            case "Inclination":
                return (
                    <ListItem
                        label={t("Inclination")}
                        value={technicalFeatures?.inclination}
                        align="horizontal"
                    />
                );
        }
    };
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper elevation={10} sx={{ overflow: "auto" }}>
                    <Box
                        sx={{
                            px: 2.5,
                            py: 1,
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        <Typography variant="h6">
                            {t("Technical Features And Interior")}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {technicalFeatures1(
                            data?.parentCategory as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TechnicalFeatures;
