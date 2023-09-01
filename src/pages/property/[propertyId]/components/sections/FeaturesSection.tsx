import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { List, ListBooleanItem } from "src/components/List";
import { IProperties, ParentCategory } from "src/types/properties";

interface FeaturesProps {
    data: IProperties;
}

// export type ParentCategory = "Residential" | "Commercial" | "Land" | "Other";

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    Residential: [
        "Panoramic View",
        "Corner",
        "Facade",
        "Organized Garden",
        "Drilling",
        "Adapting to the Ground",
        "Pool",
        "Barbeque",
        "Sea View",
        "Mountain View",
        "Sea Front",
        "Smart Home",
        "Thermal Insulation",
        "Jacuzzi",
        "Internet",
        "Walkable Distance to Beach",
        "Quiet Area",
        "View",
        "Near Bus Route",
        "Guestroom",
        "Office",
        "Home Cinema",
        "Combined Kitchen and Dinning Area",
        "Sound Insulation",
        "Veranda",
        "Well",
        "Masonry Fence",
        "Access for Disabled",
        "Tents",
        "Heated Pool",
        "Has 24 Hours Security",
        "CCTV",
        "Fire Detector",
        "Independent Heating Per Room",
        "Indoor Pool",
    ],
    Commercial: [
        "Organized Garden",
        "Has 24 Hours Security",
        "CCTV",
        "Internet",
        "Walkable Distance to Beach",
        "Fire Detector",
        "Quiet Area",
        "Sound Insulation",
        "Access for Disable",
        "Indepent Heating Per Room",
        "Adapting to the Ground",
        "Pool",
        "View",
        "Veranda",
        "Corner",
        "Facade",
    ],
    Land: [
        "Panoramic View",
        "Corner",
        "Facade",
        "Within City Plan",
        "Within Residential Zone",
    ],
    Other: ["Panoramic View", "Facade", "Loading Dock", "Veranda", "View"],
};

const Features: React.FC<FeaturesProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const features = data?.features;
    const parentCategory = data?.parentCategory;

    const renderThirdOfFields = (
        fields: string[],
        from: number,
        to: number
    ) => (
        <Grid item xs={4}>
            <List>
                {fields
                    .slice(from, to)
                    .map((field) => renderPropertyFeaturesItem(field))}
            </List>
        </Grid>
    );

    const propertyFeatures = (category: ParentCategory) => {
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

    const renderPropertyFeaturesItem = (field: string) => {
        switch (field) {
            case "Panoramic View":
                return (
                    <ListBooleanItem
                        label={t("Panoramic View")}
                        status={features?.panoramicView}
                        align="horizontal"
                    />
                );
            case "Corner":
                return (
                    <ListBooleanItem
                        label={t("Corner")}
                        status={features?.corner}
                        align="horizontal"
                    />
                );
            case "Facade":
                return (
                    <ListBooleanItem
                        label={t("Facade")}
                        status={features?.facade}
                        align="horizontal"
                    />
                );
            case "Organized Garden":
                return (
                    <ListBooleanItem
                        label={t("Organized Garden")}
                        status={features?.organizedGarden}
                        align="horizontal"
                    />
                );
            case "Drilling":
                return (
                    <ListBooleanItem
                        label={t("Drilling")}
                        status={features?.drilling}
                        align="horizontal"
                    />
                );
            case "Adapting to the Ground":
                return (
                    <ListBooleanItem
                        label={t("Adapting to the Ground")}
                        status={features?.adaptingToTheGround}
                        align="horizontal"
                    />
                );
            case "Pool":
                return (
                    <ListBooleanItem
                        label={t("Pool")}
                        status={features?.pool}
                        align="horizontal"
                    />
                );
            case "Barbeque":
                return (
                    <ListBooleanItem
                        label={t("Barbeque")}
                        status={features?.barbeque}
                        align="horizontal"
                    />
                );
            case "Sea View":
                return (
                    <ListBooleanItem
                        label={t("Sea View")}
                        status={features?.seaView}
                        align="horizontal"
                    />
                );
            case "Mountain View":
                return (
                    <ListBooleanItem
                        label={t("Mountain View")}
                        status={features?.mountainView}
                        align="horizontal"
                    />
                );
            case "Sea Front":
                return (
                    <ListBooleanItem
                        label={t("Sea Front")}
                        status={features?.seaFront}
                        align="horizontal"
                    />
                );
            case "Smart Home":
                return (
                    <ListBooleanItem
                        label={t("Smart Home")}
                        status={features?.smartHome}
                        align="horizontal"
                    />
                );
            case "Thermal Insulation":
                return (
                    <ListBooleanItem
                        label={t("Thermal Insulation")}
                        status={features?.thermalInsulation}
                        align="horizontal"
                    />
                );
            case "Jacuzzi":
                return (
                    <ListBooleanItem
                        label={t("Jacuzzi")}
                        status={features?.jacuzzi}
                        align="horizontal"
                    />
                );
            case "Internet":
                return (
                    <ListBooleanItem
                        label={t("Internet")}
                        status={features?.internet}
                        align="horizontal"
                    />
                );
            case "Walkable Distance to Beach":
                return (
                    <ListBooleanItem
                        label={t("Walkable Distance to Beach")}
                        status={features?.walkableDistanceToBeach}
                        align="horizontal"
                    />
                );
            case "Quiet Area":
                return (
                    <ListBooleanItem
                        label={t("Quiet Area")}
                        status={features?.quietArea}
                        align="horizontal"
                    />
                );
            case "View":
                return (
                    <ListBooleanItem
                        label={t("View")}
                        status={features?.view}
                        align="horizontal"
                    />
                );
            case "Near Bus Route":
                return (
                    <ListBooleanItem
                        label={t("Near Bus Route")}
                        status={features?.nearBusRoute}
                        align="horizontal"
                    />
                );
            case "Guestroom":
                return (
                    <ListBooleanItem
                        label={t("Guestroom")}
                        status={features?.guestroom}
                        align="horizontal"
                    />
                );
            case "Office":
                return (
                    <ListBooleanItem
                        label={t("Office")}
                        status={features?.office}
                        align="horizontal"
                    />
                );
            case "Home Cinema":
                return (
                    <ListBooleanItem
                        label={t("Home Cinema")}
                        status={features?.homeCinema}
                        align="horizontal"
                    />
                );
            case "Combined Kitchen and Dinning Area":
                return (
                    <ListBooleanItem
                        label={t("Combined Kitchen and Dinning Area")}
                        status={features?.combinedKitchenAndDiningArea}
                        align="horizontal"
                    />
                );
            case "Sound Insulation":
                return (
                    <ListBooleanItem
                        label={t("Sound Insulation")}
                        status={features?.soundInsulation}
                        align="horizontal"
                    />
                );
            case "Veranda":
                return (
                    <ListBooleanItem
                        label={t("Veranda")}
                        status={features?.veranda}
                        align="horizontal"
                    />
                );
            case "Well":
                return (
                    <ListBooleanItem
                        label={t("Well")}
                        status={features?.well}
                        align="horizontal"
                    />
                );
            case "Masonry Fence":
                return (
                    <ListBooleanItem
                        label={t("Masonry Fence")}
                        status={features?.masonryFence}
                        align="horizontal"
                    />
                );
            case "Access for Disabled":
                return (
                    <ListBooleanItem
                        label={t("Access for Disabled")}
                        status={features?.accessForDisabled}
                        align="horizontal"
                    />
                );
            case "Tents":
                return (
                    <ListBooleanItem
                        label={t("Tents")}
                        status={features?.tents}
                        align="horizontal"
                    />
                );
            case "Heated Pool":
                return (
                    <ListBooleanItem
                        label={t("Heated Pool")}
                        status={features?.heatedPool}
                        align="horizontal"
                    />
                );
            case "Has 24 Hours Security":
                return (
                    <ListBooleanItem
                        label={t("Has 24 Hours Security")}
                        status={features?.has24HoursSecurity}
                        align="horizontal"
                    />
                );
            case "CCTV":
                return (
                    <ListBooleanItem
                        label={t("CCTV")}
                        status={features?.cctv}
                        align="horizontal"
                    />
                );
            case "Fire Detector":
                return (
                    <ListBooleanItem
                        label={t("Fire Detector")}
                        status={features?.fireDetector}
                        align="horizontal"
                    />
                );
            case "Independent Heating Per Room":
                return (
                    <ListBooleanItem
                        label={t("Independent Heating Per Room")}
                        status={features?.independentHeatingPerRoom}
                        align="horizontal"
                    />
                );
            case "Indoor Pool":
                return (
                    <ListBooleanItem
                        label={t("Indoor Pool")}
                        status={features?.indoorPool}
                        align="horizontal"
                    />
                );
            case "Within City Plan":
                return (
                    <ListBooleanItem
                        label={t("Within City Plan")}
                        status={features?.withinCityPlan}
                        align="horizontal"
                    />
                );
            case "Within Residential Zone":
                return (
                    <ListBooleanItem
                        label={t("Within Residential Zone")}
                        status={features?.withinResidentialZone}
                        align="horizontal"
                    />
                );
            case "Loading Dock":
                return (
                    <ListBooleanItem
                        label={t("Loading Dock")}
                        status={features?.loadingDock}
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
                        <Typography variant="h6">{t("Features")}</Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {propertyFeatures(
                            data?.parentCategory as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Features;
