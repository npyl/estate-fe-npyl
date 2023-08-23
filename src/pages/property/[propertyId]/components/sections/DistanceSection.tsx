import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface DistanceSectionProps {
    data: IProperties;
}

const DistanceSection: React.FC<DistanceSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    if (!data) return null;
    const distances = data?.distances;
    if (!distances) return null;

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Distances")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container spacing={1}>
                <Grid item xs={6} order={"row"} padding={0}>
                    <List>
                        <ListItem
                            label={t("Schools")}
                            value={distances?.schools || "" + " km"}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Supermarket")}
                            value={distances?.supermarket || "" + " km"}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Cafe Restaurant")}
                            value={distances?.cafeRestaurant || "" + " km"}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Hospital")}
                            value={distances?.hospital || "" + " km"}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem
                            label={t("Airport")}
                            value={distances?.airport || "" + " km"}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("From Sea")}
                            value={distances?.sea || "" + " km"}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("From Public Transport")}
                            value={distances?.publicTransport || "" + " km"}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DistanceSection;
