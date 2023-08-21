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
                        {areas?.groundFloor && (
                            <ListItem
                                label={t("Ground Floor")}
                                value={areas?.groundFloor}
                                align="horizontal"
                            />
                        )}
                        {areas?.first && (
                            <ListItem
                                label={t("First")}
                                value={areas?.first}
                                align="horizontal"
                            />
                        )}
                        {areas?.second && (
                            <ListItem
                                label={t("Second")}
                                value={areas?.second}
                                align="horizontal"
                            />
                        )}
                        {areas?.third && (
                            <ListItem
                                label={t("Third")}
                                value={areas?.third}
                                align="horizontal"
                            />
                        )}
                        {areas?.fourth && (
                            <ListItem
                                label={t("Fourth")}
                                value={areas?.fourth}
                                align="horizontal"
                            />
                        )}
                        {areas?.fifth && (
                            <ListItem
                                label={t("Fifth")}
                                value={areas?.fifth}
                                align="horizontal"
                            />
                        )}
                        <ListItem
                            label={t("Plot")}
                            value={areas?.plot}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem
                            label={t("Covered")}
                            value={areas?.covered}
                            align="horizontal"
                        />
                        {areas?.basement && (
                            <ListItem
                                label={t("Basement")}
                                value={areas?.basement}
                                align="horizontal"
                            />
                        )}
                        {areas?.attic && (
                            <ListItem
                                label={t("Attic")}
                                value={areas?.attic}
                                align="horizontal"
                            />
                        )}
                        {areas?.garden && (
                            <ListItem
                                label={t("Garden")}
                                value={areas?.garden}
                                align="horizontal"
                            />
                        )}
                        {areas?.balconies && (
                            <ListItem
                                label={t("Balconies")}
                                value={areas?.balconies}
                                align="horizontal"
                            />
                        )}
                        {areas?.storeroom && (
                            <ListItem
                                label={t("Storeroom")}
                                value={areas?.storeroom}
                                align="horizontal"
                            />
                        )}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AreaSection;
