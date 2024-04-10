import React, { FC } from "react";
import { IProperties, ParentCategory } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List } from "src/components/List";
import { useTranslation } from "react-i18next";
import DistanceListItem from "@/components/List/Items/distance";

interface DistanceSectionProps {
    data: IProperties;
}
interface DistancesItemProps {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "Public Transportation",
        "Sea",
        "Schools",
        "Supermarket",
        "Cafe-Restaurant",
        "Hospital",
        "Airport",
    ],
    COMMERCIAL: [
        "Public Transportation",
        "Sea",
        "Schools",
        "Supermarket",
        "Cafe-Restaurant",
        "Hospital",
        "Airport",
    ],
    LAND: [],
    OTHER: [],
};

const DistanceSection: React.FC<DistanceSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();

    const distances = data?.distances;

    if (
        data.parentCategory.key === "LAND" ||
        data.parentCategory.key === "OTHER"
    )
        return null;

    const renderHalfOfFields = (fields: string[], from: number, to: number) => {
        return (
            <Grid item xs={12} sm={6}>
                <List>
                    {fields.slice(from, to).map((field, i) => (
                        <DistancesItem field={field} key={i} />
                    ))}
                </List>
            </Grid>
        );
    };

    const renderDistances = (category: ParentCategory) => {
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

    const DistancesItem: FC<DistancesItemProps> = ({ field }) => {
        switch (field) {
            case "Schools":
                return (
                    <DistanceListItem
                        label={t("Schools")}
                        value={distances?.schools}
                    />
                );
            case "Supermarket":
                return (
                    <DistanceListItem
                        label={t("Supermarket")}
                        value={distances?.supermarket}
                    />
                );
            case "Cafe-Restaurant":
                return (
                    <DistanceListItem
                        label={t("Cafe-Restaurant")}
                        value={distances?.cafeRestaurant}
                    />
                );
            case "Hospital":
                return (
                    <DistanceListItem
                        label={t("Hospital")}
                        value={distances?.hospital}
                    />
                );

            case "Sea":
                return (
                    <DistanceListItem
                        label={t("From Sea")}
                        value={distances?.sea}
                    />
                );
            case "Public Transportation":
                return (
                    <DistanceListItem
                        label={t("Public Transportation")}
                        value={distances?.publicTransport}
                    />
                );
            case "Airport":
                return (
                    <DistanceListItem
                        label={t("Airport")}
                        value={distances?.airport}
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
                        <Typography variant="h6">{t("Distances")}</Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        {renderDistances(
                            data?.parentCategory.key as ParentCategory
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default DistanceSection;
