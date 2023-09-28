import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface AreaSectionProps {
    data: IProperties;
}

const AreaSection: React.FC<AreaSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    if (!data) return null;
    const areas = data?.areas;
    const parentCategory = data?.parentCategory.key;
    if (parentCategory === "LAND" || parentCategory === "OTHER") return null;
    if (!areas) return null;

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
                <Typography variant="h6">{t("Area")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={6}>
                    <List>
                        <ListItem
                            label={t("Ground Floor")}
                            value={
                                areas?.groundFloor
                                    ? areas.groundFloor + "m²"
                                    : "- m²"
                            }
                            align="horizontal"
                        />

                        <ListItem
                            label={t("First")}
                            value={areas?.first ? areas.first + "m²" : "- m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Second")}
                            value={areas?.second ? areas.second + "m²" : "- m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Third")}
                            value={areas?.third ? areas.third + "m²" : "- m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Fourth")}
                            value={areas?.fourth ? areas.fourth + "m²" : "- m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Fifth")}
                            value={areas?.fifth ? areas.fifth + "m²" : "- m²"}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem
                            label={t("Covered")}
                            value={
                                areas?.covered ? areas.covered + "m²" : "- m²"
                            }
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Basement")}
                            value={
                                areas?.basement ? areas.basement + "m²" : "- m²"
                            }
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Attic")}
                            value={areas?.attic ? areas.attic + "m²" : "- m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Garden")}
                            value={areas?.garden ? areas.garden + "m²" : "- m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Balconies")}
                            value={
                                areas?.balconies
                                    ? areas.balconies + "m²"
                                    : "- m²"
                            }
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Storeroom")}
                            value={
                                areas?.storeroom
                                    ? areas.storeroom + "m²"
                                    : "- m²"
                            }
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AreaSection;
