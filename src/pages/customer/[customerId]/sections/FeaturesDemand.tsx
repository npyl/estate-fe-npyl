import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { List, ListBooleanItem } from "src/components/List";
import useGetCustomer from "@/hooks/customer";
import { ParentCategory } from "src/types/demand";

interface FeaturesProps {
    index: number;
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
        "Alarm System",
        "Bright",
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

const Features: React.FC<FeaturesProps> = ({ index }) => {
    const { t } = useTranslation();

    const { customer: data } = useGetCustomer();

    const demands = data?.demands[index];
    const features = demands?.priorityFeatures;

    const renderThirdOfFields = (
        fields: string[],
        from: number,
        to: number
    ) => (
        <Grid item xs={6} sm={6}>
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
                        status={features?.panoramicView ?? false}
                    />
                );

            case "Corner":
                return (
                    <ListBooleanItem
                        label={t("Corner")}
                        status={features?.corner ?? false}
                    />
                );
            case "Facade":
                return (
                    <ListBooleanItem
                        label={t("Facade")}
                        status={features?.facade ?? false}
                    />
                );
            case "Organized Garden":
                return (
                    <ListBooleanItem
                        label={t("Organized Garden")}
                        status={features?.organizedGarden ?? false}
                    />
                );
            case "Drilling":
                return (
                    <ListBooleanItem
                        label={t("Drilling")}
                        status={features?.drilling ?? false}
                    />
                );
            case "Adapting to the Ground":
                return (
                    <ListBooleanItem
                        label={t("Adapting to the Ground")}
                        status={features?.adaptingToTheGround ?? false}
                    />
                );
            case "Pool":
                return (
                    <ListBooleanItem
                        label={t("Pool")}
                        status={features?.pool ?? false}
                    />
                );
            case "Barbeque":
                return (
                    <ListBooleanItem
                        label={t("Barbeque")}
                        status={features?.barbeque ?? false}
                    />
                );
            case "Sea View":
                return (
                    <ListBooleanItem
                        label={t("Sea View")}
                        status={features?.seaView ?? false}
                    />
                );
            case "Mountain View":
                return (
                    <ListBooleanItem
                        label={t("Mountain View")}
                        status={features?.mountainView ?? false}
                    />
                );
            case "Sea Front":
                return (
                    <ListBooleanItem
                        label={t("Sea Front")}
                        status={features?.seaFront ?? false}
                    />
                );
            case "Smart Home":
                return (
                    <ListBooleanItem
                        label={t("Smart Home")}
                        status={features?.smartHome ?? false}
                    />
                );
            case "Thermal Insulation":
                return (
                    <ListBooleanItem
                        label={t("Thermal Insulation")}
                        status={features?.thermalInsulation ?? false}
                    />
                );
            case "Jacuzzi":
                return (
                    <ListBooleanItem
                        label={t("Jacuzzi")}
                        status={features?.jacuzzi ?? false}
                    />
                );
            case "Internet":
                return (
                    <ListBooleanItem
                        label={t("Internet")}
                        status={features?.internet ?? false}
                    />
                );
            case "Walkable Distance to Beach":
                return (
                    <ListBooleanItem
                        label={t("Walkable Distance to Beach")}
                        status={features?.walkableDistanceToBeach ?? false}
                    />
                );
            case "Quiet Area":
                return (
                    <ListBooleanItem
                        label={t("Quiet Area")}
                        status={features?.quietArea ?? false}
                    />
                );
            case "View":
                return (
                    <ListBooleanItem
                        label={t("View")}
                        status={features?.view ?? false}
                    />
                );
            case "Near Bus Route":
                return (
                    <ListBooleanItem
                        label={t("Near Bus Route")}
                        status={features?.nearBusRoute ?? false}
                    />
                );
            case "Guestroom":
                return (
                    <ListBooleanItem
                        label={t("Guestroom")}
                        status={features?.guestroom ?? false}
                    />
                );

            case "Bright":
                return (
                    <ListBooleanItem
                        label={t("Bright")}
                        status={features?.bright ?? false}
                    />
                );
            case "Alarm System":
                return (
                    <ListBooleanItem
                        label={t("Alarm System")}
                        status={features?.alarmSystem ?? false}
                    />
                );
            case "Office":
                return (
                    <ListBooleanItem
                        label={t("Office")}
                        status={features?.office ?? false}
                    />
                );
            case "Home Cinema":
                return (
                    <ListBooleanItem
                        label={t("Home Cinema")}
                        status={features?.homeCinema ?? false}
                    />
                );
            case "Combined Kitchen and Dinning Area":
                return (
                    <ListBooleanItem
                        label={t("Combined Kitchen and Dinning Area")}
                        status={features?.combinedKitchenAndDiningArea ?? false}
                    />
                );
            case "Sound Insulation":
                return (
                    <ListBooleanItem
                        label={t("Sound Insulation")}
                        status={features?.soundInsulation ?? false}
                    />
                );
            case "Veranda":
                return (
                    <ListBooleanItem
                        label={t("Veranda")}
                        status={features?.veranda ?? false}
                    />
                );
            case "Well":
                return (
                    <ListBooleanItem
                        label={t("Well")}
                        status={features?.well ?? false}
                    />
                );
            case "Masonry Fence":
                return (
                    <ListBooleanItem
                        label={t("Masonry Fence")}
                        status={features?.masonryFence ?? false}
                    />
                );
            case "Access for Disabled":
                return (
                    <ListBooleanItem
                        label={t("Access for Disabled")}
                        status={features?.accessForDisabled ?? false}
                    />
                );
            case "Tents":
                return (
                    <ListBooleanItem
                        label={t("Tents")}
                        status={features?.tents ?? false}
                    />
                );
            case "Heated Pool":
                return (
                    <ListBooleanItem
                        label={t("Heated Pool")}
                        status={features?.heatedPool ?? false}
                    />
                );
            case "Has 24 Hours Security":
                return (
                    <ListBooleanItem
                        label={t("Has 24 Hours Security")}
                        status={features?.has24HoursSecurity ?? false}
                    />
                );
            case "CCTV":
                return (
                    <ListBooleanItem
                        label={t("CCTV")}
                        status={features?.cctv ?? false}
                    />
                );
            case "Fire Detector":
                return (
                    <ListBooleanItem
                        label={t("Fire Detector")}
                        status={features?.fireDetector ?? false}
                    />
                );
            case "Independent Heating Per Room":
                return (
                    <ListBooleanItem
                        label={t("Independent Heating Per Room")}
                        status={features?.independentHeatingPerRoom ?? false}
                    />
                );
            case "Indoor Pool":
                return (
                    <ListBooleanItem
                        label={t("Indoor Pool")}
                        status={features?.indoorPool ?? false}
                    />
                );
            case "Within City Plan":
                return (
                    <ListBooleanItem
                        label={t("Within City Plan")}
                        status={features?.withinCityPlan ?? false}
                    />
                );
            case "Within Residential Zone":
                return (
                    <ListBooleanItem
                        label={t("Within Residential Zone")}
                        status={features?.withinResidentialZone ?? false}
                    />
                );
            case "Loading Dock":
                return (
                    <ListBooleanItem
                        label={t("Loading Dock")}
                        status={features?.loadingDock ?? false}
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
                        {Array.isArray(demands?.filters?.parentCategories) &&
                            demands?.filters.parentCategories.map(
                                (categoryObj, index) => (
                                    <React.Fragment key={index}>
                                        {propertyFeatures(
                                            categoryObj.key as ParentCategory
                                        )}
                                    </React.Fragment>
                                )
                            )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Features;
