import React, { FC } from "react";
import { IProperties, ParentCategory } from "src/types/properties";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface DetailsSectionProps {
    data: IProperties;
}
interface PropertyDescriptionItem {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "Floor",
        "Bedrooms",
        "Layers",
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
        "Golden Visa",
    ],
    COMMERCIAL: [
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
    LAND: [
        "Orientation",
        "Accessibility",
        "Land Use",
        "Distance From Sea",
        "Irrigation",
        "Water Supply",
        "Electricity Supply",
        "Building",
        "Building Permit",
    ],
    OTHER: [
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
    const distances = data?.distances;

    const renderThirdOfFields = (
        fields: string[],
        from: number,
        to: number
    ) => (
        <Grid item xs={12} sm={6} md={4}>
            <List>
                {fields.slice(from, to).map((field, index) => (
                    <PropertyDescriptionItem field={field} key={index} />
                ))}
            </List>
        </Grid>
    );

    const propertyDescription = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;

        const total = fieldsForCategory.length;
        const third = Math.floor(total / 3);

        // Calculate remaining items after dividing into thirds
        const remaining = total - third * 3;

        // Indices to divide fieldsForCategory
        const firstEnd = third + (remaining > 0 ? 1 : 0);
        const secondEnd = firstEnd + third + (remaining > 1 ? 1 : 0);

        return (
            <Grid container>
                {renderThirdOfFields(fieldsForCategory, 0, firstEnd)}
                {renderThirdOfFields(fieldsForCategory, firstEnd, secondEnd)}
                {renderThirdOfFields(fieldsForCategory, secondEnd, total)}
            </Grid>
        );
    };

    const PropertyDescriptionItem: FC<PropertyDescriptionItem> = ({
        field,
    }) => {
        switch (field) {
            case "Floor":
                return (
                    <ListItem
                        label={t("Floor")}
                        value={details?.floor.value || "-"}
                    />
                );
            case "Layers":
                return (
                    <ListItem
                        label={t("Layers")}
                        value={details?.layers || "-"}
                    />
                );
            case "Bedrooms":
                return (
                    <ListItem
                        label={t("Bedrooms")}
                        value={details?.bedrooms || "-"}
                    />
                );
            case "Kitchens":
                return (
                    <ListItem
                        label={t("Kitchens")}
                        value={details?.kitchens || "-"}
                    />
                );
            case "Bathrooms":
                return (
                    <ListItem
                        label={t("Bathrooms")}
                        value={details?.bathrooms || "-"}
                    />
                );
            case "W/C":
                return <ListItem label={t("W/C")} value={details?.wc || "-"} />;
            case "Living Rooms":
                return (
                    <ListItem
                        label={t("Living Rooms")}
                        value={details?.livingrooms || "-"}
                    />
                );
            case "View Type":
                return (
                    <ListItem
                        label={t("View Type")}
                        value={details?.viewType.value || "-"}
                    />
                );
            case "Zone Type":
                return (
                    <ListItem
                        label={t("Zone Type")}
                        value={details?.zoneType.value || "-"}
                    />
                );
            case "Land Use":
                return (
                    <ListItem
                        label={t("Land Use")}
                        value={details?.landUse.value || "-"}
                    />
                );
            case "Accessibility":
                return (
                    <ListItem
                        label={t("Accessibility")}
                        value={details?.accessibility.value || "-"}
                    />
                );
            case "Rooms":
                return (
                    <ListItem
                        label={t("Rooms")}
                        value={details?.rooms || "-"}
                    />
                );
            case "Orientation":
                return (
                    <ListItem
                        label={t("Orientation")}
                        value={details?.orientation.value || "-"}
                    />
                );
            case "Floor Apartment":
                return (
                    <ListBooleanItem
                        label={t("Floor Apartment")}
                        status={details?.floorApartment}
                    />
                );
            case "Penthouse":
                return (
                    <ListBooleanItem
                        label={t("Penthouse")}
                        status={details?.penthouse}
                    />
                );
            case "Storeroom":
                return (
                    <ListBooleanItem
                        label={t("Storeroom")}
                        status={details?.storeroom}
                    />
                );

            case "Attic":
                return (
                    <ListBooleanItem
                        label={t("Attic")}
                        status={details?.attic}
                    />
                );

            case "Playroom":
                return (
                    <ListBooleanItem
                        label={t("Playroom")}
                        status={details?.playroom}
                    />
                );

            case "Distance From Sea":
                return (
                    <ListItem
                        label={t("Distance From Sea")}
                        value={distances?.sea || "-"}
                    />
                );
            case "Number of WC":
                return (
                    <ListItem
                        label={t("Number of WC")}
                        value={details?.wc || "-"}
                    />
                );
            case "Zone":
                return (
                    <ListItem
                        label={t("Zone")}
                        value={details?.zoneType.value || "-"}
                    />
                );
            case "View":
                return (
                    <ListItem
                        label={t("View")}
                        value={details?.viewType.value || "-"}
                    />
                );
            case "Golden Visa":
                return (
                    <ListBooleanItem
                        label={t("Golden Visa")}
                        status={details?.goldenVisa || false}
                    />
                );

            case "Irrigation":
                return (
                    <ListBooleanItem
                        label={t("Irrigation")}
                        status={details?.irrigation || false}
                    />
                );
            case "Water Supply":
                return (
                    <ListBooleanItem
                        label={t("Water Supply")}
                        status={details?.waterSupply || false}
                    />
                );
            case "Electricity Supply":
                return (
                    <ListBooleanItem
                        label={t("Electricity Supply")}
                        status={details?.electricitySupply || false}
                    />
                );
            case "Building":
                return (
                    <ListBooleanItem
                        label={t("Building")}
                        status={details?.hasBuilding || false}
                    />
                );
            case "Building Permit":
                return (
                    <ListBooleanItem
                        label={t("Building Permit")}
                        status={details?.hasBuildingPermit || false}
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
                            {t("Property Description")}
                        </Typography>
                    </Box>
                    <Divider />
                    <Grid container>
                        {propertyDescription(
                            data?.parentCategory.key as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DetailsSection;
