import React, { FC } from "react";
import { IProperties, ParentCategory } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface TechnicalFeaturesProps {
    data: IProperties;
}
interface TechnicalFeaturesItemProps {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
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
    COMMERCIAL: [
        "Display Window Length",
        "Entrances",
        // ---
        "Furnished",
        "Frame Type",
        "Pane Glass Type",
        "Floor Type",
        // ---
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
    LAND: [
        "Floor To Area Ratio",
        "Coverage Factor",
        "Facade Length",
        "Inclination",
    ],
    OTHER: [
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
        <Grid item xs={12} sm={6} md={4}>
            <List>
                {fields.slice(from, to).map((field, i) => (
                    <TechnicalFeatureItem field={field} key={i} />
                ))}
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
    const TechnicalFeatureItem: FC<TechnicalFeaturesItemProps> = ({
        field,
    }) => {
        switch (field) {
            case "Entrances":
                return (
                    <ListItem
                        label={t("Entrances")}
                        value={technicalFeatures?.entrances || "-"}
                    />
                );
            case "Display Windows Length":
                return (
                    <ListItem
                        label={t("Display Windows Length")}
                        value={technicalFeatures?.displayWindowsLength || "-"}
                    />
                );
            case "Safety Door":
                return (
                    <ListBooleanItem
                        label={t("Safety Door")}
                        status={technicalFeatures?.safetyDoor}
                    />
                );
            case "Alarm System":
                return (
                    <ListBooleanItem
                        label={t("Alarm System")}
                        status={technicalFeatures?.alarmSystem}
                    />
                );
            case "Painted":
                return (
                    <ListBooleanItem
                        label={t("Painted")}
                        status={technicalFeatures?.painted}
                    />
                );
            case "Furnished":
                return (
                    <ListItem
                        label={t("Furnished")}
                        value={technicalFeatures?.furnished?.value || "-"}
                    />
                );
            case "Frame Type":
                return (
                    <ListItem
                        label={t("Frame Type")}
                        value={technicalFeatures?.frameType?.value || "-"}
                    />
                );
            case "Pane Glass Type":
                return (
                    <ListItem
                        label={t("Pane Glass Type")}
                        value={technicalFeatures?.paneGlassType?.value || "-"}
                    />
                );
            case "Window Screens":
                return (
                    <ListBooleanItem
                        label={t("Window Screens")}
                        status={technicalFeatures?.windowScreens}
                    />
                );
            case "Fireplace":
                return (
                    <ListBooleanItem
                        label={t("Fireplace")}
                        status={technicalFeatures?.fireplace}
                    />
                );
            case "Bright":
                return (
                    <ListBooleanItem
                        label={t("Bright")}
                        status={technicalFeatures?.bright}
                    />
                );
            case "Luxurious":
                return (
                    <ListBooleanItem
                        label={t("Luxurious")}
                        status={technicalFeatures?.luxurious}
                    />
                );
            case "Electric Car Charging Facilities":
                return (
                    <ListBooleanItem
                        label={t("Electric Car Charging Facilities")}
                        status={
                            technicalFeatures?.electricCarChargingFacilities
                        }
                    />
                );
            case "Reception":
                return (
                    <ListBooleanItem
                        label={t("Reception")}
                        status={technicalFeatures?.reception}
                    />
                );
            case "Pets Allowed":
                return (
                    <ListBooleanItem
                        label={t("Pets Allowed")}
                        status={technicalFeatures?.petsAllowed}
                    />
                );
            case "Floor Type":
                return (
                    <ListItem
                        label={t("Floor Type")}
                        value={technicalFeatures?.floorType?.value || "-"}
                    />
                );

            case "Satellite TV":
                return (
                    <ListBooleanItem
                        label={t("Satellite TV")}
                        status={technicalFeatures?.satelliteTV}
                    />
                );

            case "Wiring":
                return (
                    <ListBooleanItem
                        label={t("Wiring")}
                        status={technicalFeatures?.wiring}
                    />
                );
            case "Loading - Unloading Elevator":
                return (
                    <ListBooleanItem
                        label={t("Loading - Unloading Elevator")}
                        status={technicalFeatures?.loadingUnloadingElevator}
                    />
                );
            case "False Ceiling":
                return (
                    <ListBooleanItem
                        label={t("False Ceiling")}
                        status={technicalFeatures?.falseCeiling}
                    />
                );
            case "With Equipment":
                return (
                    <ListBooleanItem
                        label={t("With Equipment")}
                        status={technicalFeatures?.withEquipment}
                    />
                );
            case "Double Frontage":
                return (
                    <ListBooleanItem
                        label={t("Double Frontage")}
                        status={technicalFeatures?.doubleFrontage}
                    />
                );
            case "Consideration":
                return (
                    <ListBooleanItem
                        label={t("Consideration")}
                        status={technicalFeatures?.consideration}
                    />
                );
            case "Floor To Area Ratio":
                return (
                    <ListItem
                        label={t("Floor to Area Ratio")}
                        value={technicalFeatures?.floorToAreaRatio || "-"}
                    />
                );
            case "Coverage Factor":
                return (
                    <ListItem
                        label={t("Coverage Factor")}
                        value={technicalFeatures?.coverageFactor || "-"}
                    />
                );
            case "Facade Length":
                return (
                    <ListItem
                        label={t("Facade Length")}
                        value={technicalFeatures?.facadeLength || "-"}
                    />
                );
            case "Inclination":
                return (
                    <ListItem
                        label={t("Inclination")}
                        value={technicalFeatures?.inclination?.value || "-"}
                    />
                );
        }
        return null;
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
                            data?.parentCategory.key as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TechnicalFeatures;
