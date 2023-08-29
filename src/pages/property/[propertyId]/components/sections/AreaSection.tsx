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
    const category = data?.parentCategory;
    if (category == "Land" || category == "Other") return null;
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
                        {/* {areas?.groundFloor && ( */}
                        <ListItem
                            label={t("Ground Floor")}
                            value={areas?.groundFloor + "m²" || "" + "m²"}
                            align="horizontal"
                        />
                        {/* // )} */}

                        <ListItem
                            label={t("First")}
                            value={areas?.first + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Second")}
                            value={areas?.second + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Third")}
                            value={areas?.third + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Fourth")}
                            value={areas?.fourth + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Fifth")}
                            value={areas?.fifth + "m²" || "" + "m²"}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListItem
                            label={t("Covered")}
                            value={areas?.covered + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Basement")}
                            value={areas?.basement + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Attic")}
                            value={areas?.attic + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Garden")}
                            value={areas?.garden + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Balconies")}
                            value={areas?.balconies + "m²" || "" + "m²"}
                            align="horizontal"
                        />

                        <ListItem
                            label={t("Storeroom")}
                            value={areas?.storeroom + "m²" || "" + "m²"}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AreaSection;
