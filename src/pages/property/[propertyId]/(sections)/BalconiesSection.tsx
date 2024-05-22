import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "src/components/List";
import { IProperties } from "src/types/properties";

interface BalconiesSectionProps {
    data: IProperties;
}

const BalconiesSection: React.FC<BalconiesSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const details = data?.details;
    const balconies = details?.balconies || [];

    return balconies && balconies.length > 0 ? (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                width: { md: "100%", sm: "100%" },
            }}
        >
            {balconies?.map((balcony, index) => {
                return (
                    <Paper elevation={10} sx={{ overflow: "auto" }} key={index}>
                        <Box
                            sx={{
                                px: 3,
                                py: 1.5,
                                display: "flex",
                                justifyContent: "left",
                            }}
                        >
                            <Typography variant="h6">
                                {t("Balcony No.")}
                                {index + 1}
                            </Typography>
                        </Box>
                        <Divider></Divider>
                        <Grid container spacing={1}>
                            <Grid item xs={12} order={"row"} padding={0}>
                                <List>
                                    <ListItem
                                        label={t("Living Space")}
                                        value={balcony?.area}
                                    />
                                    <ListItem
                                        label={t("Side")}
                                        value={balcony?.side.value}
                                    />
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                );
            })}
        </Box>
    ) : (
        <></>
    );
};

export default BalconiesSection;
