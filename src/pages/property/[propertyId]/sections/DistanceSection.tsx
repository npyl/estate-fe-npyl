import React, { FC } from "react";
import { IProperties, ParentCategory } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

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
            <Grid item xs={6}>
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
                    <ListItem
                        label={t("Schools")}
                        value={
                            distances?.schools
                                ? `${distances.schools} m²`
                                : "- m²"
                        }
                        align="horizontal"
                    />
                );
            case "Supermarket":
                return (
                    <ListItem
                        label={t("Supermarket")}
                        value={
                            distances?.supermarket
                                ? `${distances.supermarket} m²`
                                : "- m²"
                        }
                        align="horizontal"
                    />
                );
            case "Cafe-Restaurant":
                return (
                    <ListItem
                        label={t("Cafe-Restaurant")}
                        value={
                            distances?.cafeRestaurant
                                ? `${distances.cafeRestaurant} m²`
                                : "- m²"
                        }
                        align="horizontal"
                    />
                );
            case "Hospital":
                return (
                    <ListItem
                        label={t("Hospital")}
                        value={
                            distances?.hospital
                                ? `${distances.hospital} m²`
                                : "- m²"
                        }
                        align="horizontal"
                    />
                );

            case "Sea":
                return (
                    <ListItem
                        label={t("From Sea")}
                        value={distances?.sea ? `${distances.sea} m²` : "- m²"}
                        align="horizontal"
                    />
                );
            case "Public Transportation":
                return (
                    <ListItem
                        label={t("Public Transportation")}
                        value={
                            distances?.publicTransport
                                ? `${distances.publicTransport}  m²`
                                : "-  m²"
                        }
                        align="horizontal"
                    />
                );
            case "Airport":
                return (
                    <ListItem
                        label={t("Airport")}
                        value={
                            distances?.airport
                                ? `${distances.airport}  m²`
                                : "-  m²"
                        }
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
