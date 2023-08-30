import React from "react";
import { IProperties, ParentCategory } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListItem, ListBooleanItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface HeatingSectionProps {
    data: IProperties;
}
const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    Residential: [
        "Heating Type",
        "Energy Class",
        "Heating System",
        "Electricity Type",
        "Floor Heating",
        "Air-Coditioning",
        "Solar Boiler",
        "Off Peak Electricity",
    ],
    Commercial: [
        "Heating Type",
        "Energy Class",
        "Heating System",
        "Electricity Type",
        "Floor Heating",
        "Air-Coditioning",
    ],
    Land: [],
    Other: [
        "Heating Type",
        "Energy Class",
        "Heating System",
        "Electricity Type",
        "Floor Heating",
        "Air-Coditioning",
    ],
};
const HeatingSection: React.FC<HeatingSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    if (!data) return null;
    const heating = data?.heatingAndEnergy;
    if (!heating) return null;
    if (data.parentCategory == "Land") return null;
    const renderHalfOfFields = (fields: string[], from: number, to: number) => (
        <Grid item xs={6}>
            <List>
                {fields
                    .slice(from, to)
                    .map((field) => renderHeatingItem(field))}
            </List>
        </Grid>
    );

    const propertyDescription = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;

        const half = Math.ceil(fieldsForCategory.length / 2);

        return (
            <Grid container>
                {renderHalfOfFields(fieldsForCategory, 0, half)}
                {renderHalfOfFields(
                    fieldsForCategory,
                    half,
                    fieldsForCategory.length
                )}
            </Grid>
        );
    };

    const renderHeatingItem = (field: string) => {
        switch (field) {
            case "Energy Class":
                return (
                    <ListItem
                        label={t("Energy Class")}
                        value={heating?.energyClass}
                        align="horizontal"
                    />
                );
            case "Heating Type":
                return (
                    <ListItem
                        label={t("Heating Type")}
                        value={heating?.heatingType}
                        align="horizontal"
                    />
                );
            case "Heating System":
                return (
                    <ListItem
                        label={t("Heating System")}
                        value={heating?.heatingSystem}
                        align="horizontal"
                    />
                );
            case "Electricity Type":
                return (
                    <ListItem
                        label={t("Electricity Type")}
                        value={heating?.electricityType}
                        align="horizontal"
                    />
                );
            case "Floor Heating":
                return (
                    <ListBooleanItem
                        label={t("Floor Heating")}
                        status={heating?.floorHeating}
                        align="horizontal"
                    />
                );
            case "Air Conditioning":
                return (
                    <ListBooleanItem
                        label={t("Air Conditioning")}
                        status={heating?.airConditioning}
                        align="horizontal"
                    />
                );

            case "Solar Boiler":
                return (
                    <ListBooleanItem
                        label={t("Solar Boiler")}
                        status={heating?.solarBoiler}
                        align="horizontal"
                    />
                );
            case "Off Peak Electricity":
                return (
                    <ListBooleanItem
                        label={t("Off Peak Electricity")}
                        status={heating?.offPeakElectricity}
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
                            px: 3,
                            py: 1.5,
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        <Typography variant="h6">
                            {t("Heating and Energy")}
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

export default HeatingSection;
