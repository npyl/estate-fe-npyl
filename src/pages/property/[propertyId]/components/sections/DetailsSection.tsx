import React, { FC } from "react";
import { IProperties, ParentCategory } from "src/types/properties";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface DetailsSectionProps {
    data: IProperties;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    Residential: [
        "Floor",
        "Bedrooms",
        "Layers",
        "Kitchens",
        "Kitchens",
        "Living Rooms",
        "Number of WC",
        "Bathrooms",
        "View",
        "Accessibility",
        "Land Use",
        "Zone",
        "Rooms",
        "Orientation",
        "Attic",
        "Playroom",
        "Storeroom",
        "Penthouse",
        "Floor Apartment",
    ],
    Commercial: [
        "Floor",
        "Layers",
        "Number of WC",
        "Bathrooms",
        "Accessibility",
        "Land Use",
        "Zone",
        "Rooms",
        "Storeroom",
    ],
    Land: ["Orientation", "Accessibility", "Land Use", "Distance From Sea"],
    Other: [
        "Floor",
        "Layers",
        "Bathrooms",
        "Rooms",
        "Orientation",
        "View",
        "Zone",
        "Accessibility",
        "Land Use",
        "Soreroom",
    ],
};

const DetailsSection: React.FC<DetailsSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const details = data?.details;

    const renderThirdOfFields = (
        fields: string[],
        from: number,
        to: number
    ) => (
        <Grid item xs={4}>
            <List>
                {fields
                    .slice(from, to)
                    .map((field) => renderPropertyDescriptionItem(field))}
            </List>
        </Grid>
    );

    const propertyDescription = (category: ParentCategory) => {
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
    const renderPropertyDescriptionItem = (field: string) => {
        switch (field) {
            case "Floor":
                return (
                    <ListItem
                        label={t("Floor")}
                        value={details?.floor}
                        align="horizontal"
                    />
                );
            case "Layers":
                return (
                    <ListItem
                        label={t("Layers")}
                        value={details?.layers}
                        align="horizontal"
                    />
                );
            case "Bedrooms":
                return (
                    <ListItem
                        label={t("Bedrooms")}
                        value={details?.bedrooms}
                        align="horizontal"
                    />
                );
            case "Kitchens":
                return (
                    <ListItem
                        label={t("Kitchens")}
                        value={details?.kitchens}
                        align="horizontal"
                    />
                );
            case "Bathrooms":
                return (
                    <ListItem
                        label={t("Bathrooms")}
                        value={details?.bathrooms}
                        align="horizontal"
                    />
                );
            case "W/C":
                return (
                    <ListItem
                        label={t("W/C")}
                        value={details?.wc}
                        align="horizontal"
                    />
                );
            case "Living Rooms":
                return (
                    <ListItem
                        label={t("Living Rooms")}
                        value={details?.livingrooms}
                        align="horizontal"
                    />
                );
            case "View Type":
                return (
                    <ListItem
                        label={t("View Type")}
                        value={details?.viewType}
                        align="horizontal"
                    />
                );
            case "Zone Type":
                return (
                    <ListItem
                        label={t("Zone Type")}
                        value={details?.zoneType}
                        align="horizontal"
                    />
                );
            case "Land Use":
                return (
                    <ListItem
                        label={t("Land Use")}
                        value={details?.landUse}
                        align="horizontal"
                    />
                );
            case "Accessibility":
                return (
                    <ListItem
                        label={t("Accessibility")}
                        value={details?.accessibility}
                        align="horizontal"
                    />
                );
            case "Rooms":
                return (
                    <ListItem
                        label={t("Rooms")}
                        value={details?.rooms}
                        align="horizontal"
                    />
                );
            case "Orientation":
                return (
                    <ListItem
                        label={t("Orientation")}
                        value={details?.orientation}
                        align="horizontal"
                    />
                );
            case "Floor Apartment":
                return (
                    <ListBooleanItem
                        label={t("Floor Apartment")}
                        status={details?.floorApartment}
                        align="horizontal"
                    />
                );
            case "Penthouse":
                return (
                    <ListBooleanItem
                        label={t("Penthouse")}
                        status={details?.penthouse}
                        align="horizontal"
                    />
                );
            case "Storeroom":
                return (
                    <ListBooleanItem
                        label={t("Storeroom")}
                        status={details?.storeroom}
                        align="horizontal"
                    />
                );

            case "Attic":
                return (
                    <ListBooleanItem
                        label={t("Attic")}
                        status={details?.attic}
                        align="horizontal"
                    />
                );

            case "Playroom":
                return (
                    <ListBooleanItem
                        label={t("Playroom")}
                        status={details?.playroom}
                        align="horizontal"
                    />
                );
        }
    };

    // ... (your existing logic for renderPropertyDescriptionItem)

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
                            {t("Property Description")}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {propertyDescription(
                            data?.parentCategory as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DetailsSection;
