import React from "react";
import { IProperties } from "src/types/properties";
import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
import { List, ListBooleanItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface SuitableForProps {
    data: IProperties;
}

const SuitableFor: React.FC<SuitableForProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    if (!data) return null;
    const suitableFor = data?.suitableFor;
    if (!suitableFor) return null;

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
                <Typography variant="h6">{t("Suitable For")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container spacing={1}>
                <Grid item xs={6} order={"row"} padding={0}>
                    <List>
                        <ListBooleanItem
                            label={t("Student")}
                            status={suitableFor?.student}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Cottage")}
                            status={suitableFor?.cottage}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Tourist Rental")}
                            status={suitableFor?.touristRental}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Investment")}
                            status={suitableFor?.investment}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListBooleanItem
                            label={t("Doctors Office")}
                            status={suitableFor?.doctorsOffice}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Professional Usage")}
                            status={suitableFor?.professionalUse}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Renovation")}
                            status={suitableFor?.renovation}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Argiciltural Use")}
                            status={suitableFor?.agriculturalUse}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SuitableFor;
