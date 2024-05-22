import React, { FC } from "react";
import { IProperties, ParentCategory } from "src/types/properties";
import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
import { List, ListBooleanItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface SuitableForProps {
    data: IProperties;
}
interface SuitableForItemProps {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "Student",
        "Cottage",
        "Renovation",
        "Investment",
        "Tourist Rental",
        "Doctor's Office",
        "Professional Use",
    ],
    COMMERCIAL: ["Renovation", "Investment", "Doctor's Office"],
    LAND: ["Agricultural Use", "Investment"],
    OTHER: ["Investment"],
};

const SuitableFor: React.FC<SuitableForProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const suitableFor = data?.suitableFor;
    const renderHalfOfFields = (fields: string[], from: number, to: number) => {
        return (
            <Grid item xs={12} sm={6}>
                <List>
                    {fields.slice(from, to).map((field, i) => (
                        <SuitableForItem field={field} key={i} />
                    ))}
                </List>
            </Grid>
        );
    };
    const renderSuitableFor = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;
        const firstHalfCount = Math.ceil(fieldsForCategory.length / 2);

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

    const SuitableForItem: FC<SuitableForItemProps> = ({ field }) => {
        switch (field) {
            case "Student":
                return (
                    <ListBooleanItem
                        label={t("Student")}
                        status={suitableFor?.student}
                    />
                );
            case "Cottage":
                return (
                    <ListBooleanItem
                        label={t("Cottage")}
                        status={suitableFor?.cottage}
                    />
                );
            case "Tourist Rental":
                return (
                    <ListBooleanItem
                        label={t("Tourist Rental")}
                        status={suitableFor?.touristRental}
                    />
                );
            case "Investment":
                return (
                    <ListBooleanItem
                        label={t("Investment")}
                        status={suitableFor?.investment}
                    />
                );
            case "Doctors Office":
                return (
                    <ListBooleanItem
                        label={t("Doctors Office")}
                        status={suitableFor?.doctorsOffice}
                    />
                );
            case "Professional Usage":
                return (
                    <ListBooleanItem
                        label={t("Professional Usage")}
                        status={suitableFor?.professionalUse}
                    />
                );
            case "Renovation":
                return (
                    <ListBooleanItem
                        label={t("Renovation")}
                        status={suitableFor?.renovation}
                    />
                );
            case "Argiciltural Use":
                return (
                    <ListBooleanItem
                        label={t("Argiciltural Use")}
                        status={suitableFor?.agriculturalUse}
                    />
                );
            case "Doctor's Office":
                return (
                    <ListBooleanItem
                        label={t("Doctor's Office")}
                        status={suitableFor?.doctorsOffice}
                    />
                );
            case "Professional Use":
                return (
                    <ListBooleanItem
                        label={t("Professional Use")}
                        status={suitableFor?.professionalUse}
                    />
                );
            case "Agricultural Use":
                return (
                    <ListBooleanItem
                        label={t("Agricultural Use")}
                        status={suitableFor?.agriculturalUse}
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
                            {t("Suitable For")}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {renderSuitableFor(
                            data?.parentCategory.key as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default SuitableFor;
