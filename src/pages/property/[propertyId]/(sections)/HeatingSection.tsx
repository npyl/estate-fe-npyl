import React, { FC } from "react";
import { IProperties, ParentCategory } from "src/types/properties";
import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
import { List, ListItem, ListBooleanItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface HeatingSectionProps {
    data: IProperties;
}
interface HeatingItemProps {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "Heating Type",
        "Energy Class",
        "Heating System",
        "Electricity Type",
        "Floor Heating",
        "Air-Coditioning",
        "Solar Boiler",
        "Off Peak Electricity",
    ],
    COMMERCIAL: [
        "Heating Type",
        "Energy Class",
        "Heating System",
        "Electricity Type",
        "Floor Heating",
        "Air-Coditioning",
    ],
    LAND: [],
    OTHER: [
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
    if (data.parentCategory.key === "Land") return null;

    const renderHalfOfFields = (fields: string[], from: number, to: number) => (
        <Grid item xs={12} sm={6}>
            <List>
                {fields.slice(from, to).map((field, i) => (
                    <HeatingItem field={field} key={i} />
                ))}
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

    const HeatingItem: FC<HeatingItemProps> = ({ field }) => {
        switch (field) {
            case "Energy Class":
                return (
                    <ListItem
                        label={t("Energy Class")}
                        value={heating?.energyClass.value || "-"}
                        sx={{ minHeight: "70px" }}
                    />
                );
            case "Heating Type":
                return (
                    <ListItem
                        label={t("Heating Type")}
                        value={heating?.heatingType.value || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Heating System":
                return (
                    <ListItem
                        label={t("Heating System")}
                        value={heating?.heatingSystem.value || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Electricity Type":
                return (
                    <ListItem
                        label={t("Electricity Type")}
                        value={heating?.electricityType.value || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Floor Heating":
                return (
                    <ListBooleanItem
                        label={t("Floor Heating")}
                        status={heating?.floorHeating}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Air Conditioning":
                return (
                    <ListBooleanItem
                        label={t("Air Conditioning")}
                        status={heating?.airConditioning}
                        sx={{ minHeight: "60px" }}
                    />
                );

            case "Solar Boiler":
                return (
                    <ListBooleanItem
                        label={t("Solar Boiler")}
                        status={heating?.solarBoiler}
                        sx={{ minHeight: "70px" }}
                    />
                );
            case "Off Peak Electricity":
                return (
                    <ListBooleanItem
                        label={t("Off Peak Electricity")}
                        status={heating?.offPeakElectricity}
                        sx={{ minHeight: "60px" }}
                    />
                );
        }
        return null;
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper elevation={10} sx={{ overflow: "hidden", pb: 2 }}>
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
                            data?.parentCategory.key as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default HeatingSection;
