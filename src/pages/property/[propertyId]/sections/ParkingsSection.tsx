import React from "react";
import { IProperties } from "src/types/properties";

import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { List, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface ParkingsSectionProps {
    data: IProperties;
}

const ParkingsSection: React.FC<ParkingsSectionProps> = (props) => {
    const { data } = props;
    const parkings = data.details?.parkings;
    const { t } = useTranslation();

    if (data.parentCategory.key === "RESIDENTIAL") {
        return parkings && parkings.length > 0 ? (
            <>
                <Box
                    sx={{
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        width: { md: "100%", sm: "100%" },
                    }}
                >
                    {parkings?.map((parking, index) => {
                        return (
                            <Paper
                                elevation={10}
                                sx={{ overflow: "auto" }}
                                key={index}
                            >
                                <Grid
                                    sx={{
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 1,
                                    }}
                                    item
                                >
                                    <Box
                                        sx={{
                                            px: 3,
                                            py: 1.5,
                                            display: "flex",
                                            justifyContent: "left",
                                        }}
                                    >
                                        <Typography variant="h6">
                                            {t("Parking No.")}
                                            {index + 1}
                                        </Typography>
                                    </Box>
                                    <Divider></Divider>
                                    <List>
                                        <ListItem
                                            label={t("Parking Type")}
                                            value={parking?.parkingType.value}
                                        />
                                        <ListItem
                                            label={t("Spots")}
                                            value={parking?.spots}
                                        />
                                    </List>
                                </Grid>
                            </Paper>
                        );
                    })}
                </Box>
            </>
        ) : (
            <></>
        );
    } else return null;
};

export default ParkingsSection;
