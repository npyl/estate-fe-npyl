import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { List, ListBooleanItem } from "src/components/List";
import { IProperties, ParentCategory } from "src/types/properties";

interface FeaturesProps {
    data: IProperties;
}
interface PropertyFeaturesItemProps {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
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
    COMMERCIAL: [
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
    LAND: [
        "Panoramic View",
        "Corner",
        "Facade",
        "Within City Plan",
        "Within Residential Zone",
    ],
    OTHER: ["Panoramic View", "Facade", "Loading Dock", "Veranda", "View"],
};

const Features: React.FC<FeaturesProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const features = data?.features;

    const renderThirdOfFields = (
        fields: string[],
        from: number,
        to: number
    ) => (
        <Grid item xs={12} sm={6} md={4}>
            <List>
                {fields.slice(from, to).map((field, i) => (
                    <PropertyFeaturesItem field={field} key={i} />
                ))}
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

    const PropertyFeaturesItem: FC<PropertyFeaturesItemProps> = ({ field }) => {
        switch (field) {
            case "Panoramic View":
                return (
                    <ListBooleanItem
                        label={t("Panoramic View")}
                        status={features?.panoramicView}
                    />
                );
            case "Corner":
                return (
                    <ListBooleanItem
                        label={t("Corner")}
                        status={features?.corner}
                    />
                );
            case "Facade":
                return (
                    <ListBooleanItem
                        label={t("Facade")}
                        status={features?.facade}
                    />
                );
            case "Organized Garden":
                return (
                    <ListBooleanItem
                        label={t("Organized Garden")}
                        status={features?.organizedGarden}
                    />
                );
            case "Drilling":
                return (
                    <ListBooleanItem
                        label={t("Drilling")}
                        status={features?.drilling}
                    />
                );
            case "Adapting to the Ground":
                return (
                    <ListBooleanItem
                        label={t("Adapting to the Ground")}
                        status={features?.adaptingToTheGround}
                    />
                );
            case "Pool":
                return (
                    <ListBooleanItem
                        label={t("Pool")}
                        status={features?.pool}
                    />
                );
            case "Barbeque":
                return (
                    <ListBooleanItem
                        label={t("Barbeque")}
                        status={features?.barbeque}
                    />
                );
            case "Sea View":
                return (
                    <ListBooleanItem
                        label={t("Sea View")}
                        status={features?.seaView}
                    />
                );
            case "Mountain View":
                return (
                    <ListBooleanItem
                        label={t("Mountain View")}
                        status={features?.mountainView}
                    />
                );
            case "Sea Front":
                return (
                    <ListBooleanItem
                        label={t("Sea Front")}
                        status={features?.seaFront}
                    />
                );
            case "Smart Home":
                return (
                    <ListBooleanItem
                        label={t("Smart Home")}
                        status={features?.smartHome}
                    />
                );
            case "Thermal Insulation":
                return (
                    <ListBooleanItem
                        label={t("Thermal Insulation")}
                        status={features?.thermalInsulation}
                    />
                );
            case "Jacuzzi":
                return (
                    <ListBooleanItem
                        label={t("Jacuzzi")}
                        status={features?.jacuzzi}
                    />
                );
            case "Internet":
                return (
                    <ListBooleanItem
                        label={t("Internet")}
                        status={features?.internet}
                    />
                );
            case "Walkable Distance to Beach":
                return (
                    <ListBooleanItem
                        label={t("Walkable Distance to Beach")}
                        status={features?.walkableDistanceToBeach}
                    />
                );
            case "Quiet Area":
                return (
                    <ListBooleanItem
                        label={t("Quiet Area")}
                        status={features?.quietArea}
                    />
                );
            case "View":
                return (
                    <ListBooleanItem
                        label={t("View")}
                        status={features?.view}
                    />
                );
            case "Near Bus Route":
                return (
                    <ListBooleanItem
                        label={t("Near Bus Route")}
                        status={features?.nearBusRoute}
                    />
                );
            case "Guestroom":
                return (
                    <ListBooleanItem
                        label={t("Guestroom")}
                        status={features?.guestroom}
                    />
                );

            case "Office":
                return (
                    <ListBooleanItem
                        label={t("Office")}
                        status={features?.office}
                    />
                );
            case "Home Cinema":
                return (
                    <ListBooleanItem
                        label={t("Home Cinema")}
                        status={features?.homeCinema}
                    />
                );
            case "Combined Kitchen and Dinning Area":
                return (
                    <ListBooleanItem
                        label={t("Combined Kitchen and Dinning Area")}
                        status={features?.combinedKitchenAndDiningArea}
                    />
                );
            case "Sound Insulation":
                return (
                    <ListBooleanItem
                        label={t("Sound Insulation")}
                        status={features?.soundInsulation}
                    />
                );
            case "Veranda":
                return (
                    <ListBooleanItem
                        label={t("Veranda")}
                        status={features?.veranda}
                    />
                );
            case "Well":
                return (
                    <ListBooleanItem
                        label={t("Well")}
                        status={features?.well}
                    />
                );
            case "Masonry Fence":
                return (
                    <ListBooleanItem
                        label={t("Masonry Fence")}
                        status={features?.masonryFence}
                    />
                );
            case "Access for Disabled":
                return (
                    <ListBooleanItem
                        label={t("Access for Disabled")}
                        status={features?.accessForDisabled}
                    />
                );
            case "Tents":
                return (
                    <ListBooleanItem
                        label={t("Tents")}
                        status={features?.tents}
                    />
                );
            case "Heated Pool":
                return (
                    <ListBooleanItem
                        label={t("Heated Pool")}
                        status={features?.heatedPool}
                    />
                );
            case "Has 24 Hours Security":
                return (
                    <ListBooleanItem
                        label={t("Has 24 Hours Security")}
                        status={features?.has24HoursSecurity}
                    />
                );
            case "CCTV":
                return (
                    <ListBooleanItem
                        label={t("CCTV")}
                        status={features?.cctv}
                    />
                );
            case "Fire Detector":
                return (
                    <ListBooleanItem
                        label={t("Fire Detector")}
                        status={features?.fireDetector}
                    />
                );
            case "Independent Heating Per Room":
                return (
                    <ListBooleanItem
                        label={t("Independent Heating Per Room")}
                        status={features?.independentHeatingPerRoom}
                    />
                );
            case "Indoor Pool":
                return (
                    <ListBooleanItem
                        label={t("Indoor Pool")}
                        status={features?.indoorPool}
                    />
                );
            case "Within City Plan":
                return (
                    <ListBooleanItem
                        label={t("Within City Plan")}
                        status={features?.withinCityPlan}
                    />
                );
            case "Within Residential Zone":
                return (
                    <ListBooleanItem
                        label={t("Within Residential Zone")}
                        status={features?.withinResidentialZone}
                    />
                );
            case "Loading Dock":
                return (
                    <ListBooleanItem
                        label={t("Loading Dock")}
                        status={features?.loadingDock}
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
                        <Typography variant="h6">{t("Features")}</Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {propertyFeatures(
                            data?.parentCategory.key as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Features;
