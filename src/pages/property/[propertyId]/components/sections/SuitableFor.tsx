import React from "react";
import { IProperties, ParentCategory } from "src/types/properties";
import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
import { List, ListBooleanItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface SuitableForProps {
    data: IProperties;
}
const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    Residential: [
        "Student",
        "Cottage",
        "Renovation",
        "Investment",
        "Tourist Rental",
        "Doctor's Office",
        "Professional Use",
    ],
    Commercial: ["Renovation", "Investment", "Doctor's Office"],
    Land: ["Agricultural Use", "Investment"],
    Other: ["Investment"],
};
const SuitableFor: React.FC<SuitableForProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const suitableFor = data?.suitableFor;
    const renderHalfOfFields = (fields: string[], from: number, to: number) => {
        return (
            <Grid item xs={6}>
                <List>
                    {fields
                        .slice(from, to)
                        .map((field) => renderSuitableForItem(field))}
                </List>
            </Grid>
        );
    };
    const renderSuitableFor = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;
        const firstHalfCount = Math.ceil(fieldsForCategory.length / 2);
        const secondHalfCount = fieldsForCategory.length - firstHalfCount;

        return (
            <Grid container>
                {renderHalfOfFields(fieldsForCategory, 0, firstHalfCount)}
                {renderHalfOfFields(
                    fieldsForCategory,
                    firstHalfCount,
                    fieldsForCategory.length
                )}
            </Grid>
        );
    };

    const renderSuitableForItem = (field: string) => {
        switch (field) {
            case "Student":
                return (
                    <ListBooleanItem
                        label={t("Student")}
                        status={suitableFor?.student}
                        align="horizontal"
                    />
                );
            case "Cottage":
                return (
                    <ListBooleanItem
                        label={t("Cottage")}
                        status={suitableFor?.cottage}
                        align="horizontal"
                    />
                );
            case "Tourist Rental":
                return (
                    <ListBooleanItem
                        label={t("Tourist Rental")}
                        status={suitableFor?.touristRental}
                        align="horizontal"
                    />
                );
            case "Investment":
                return (
                    <ListBooleanItem
                        label={t("Investment")}
                        status={suitableFor?.investment}
                        align="horizontal"
                    />
                );
            case "Doctors Office":
                return (
                    <ListBooleanItem
                        label={t("Doctors Office")}
                        status={suitableFor?.doctorsOffice}
                        align="horizontal"
                    />
                );
            case "Professional Usage":
                return (
                    <ListBooleanItem
                        label={t("Professional Usage")}
                        status={suitableFor?.professionalUse}
                        align="horizontal"
                    />
                );
            case "Renovation":
                return (
                    <ListBooleanItem
                        label={t("Renovation")}
                        status={suitableFor?.renovation}
                        align="horizontal"
                    />
                );
            case "Argiciltural Use":
                return (
                    <ListBooleanItem
                        label={t("Argiciltural Use")}
                        status={suitableFor?.agriculturalUse}
                        align="horizontal"
                    />
                );
            case "Doctor's Office":
                return (
                    <ListBooleanItem
                        label={t("Doctor's Office")}
                        status={suitableFor?.doctorsOffice}
                        align="horizontal"
                    />
                );
            case "Professional Use":
                return (
                    <ListBooleanItem
                        label={t("Professional Use")}
                        status={suitableFor?.professionalUse}
                        align="horizontal"
                    />
                );
            case "Agricultural Use":
                return (
                    <ListBooleanItem
                        label={t("Agricultural Use")}
                        status={suitableFor?.agriculturalUse}
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
                            {t("Suitable For")}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {renderSuitableFor(
                            data?.parentCategory as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SuitableFor;
