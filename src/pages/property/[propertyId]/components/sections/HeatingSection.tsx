import React from "react";
import { IProperties } from "src/types/properties";

import { Typography, Box, Paper, Divider, Grid } from "@mui/material";

import { List, ListItem, ListBooleanItem } from "src/components/List";

interface HeatingSectionProps {
    data: IProperties;
}

const HeatingSection: React.FC<HeatingSectionProps> = (props) => {
    const { data } = props;
    if (!data) return null;
    const heating = data?.heatingAndEnergy;
    if (!heating) return null;

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
                <Typography variant="h6">Heating & Energy</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={6}>
                    <List>
                        <ListItem
                            label="Energy Class"
                            value={heating?.energyClass}
                            align="horizontal"
                        />
                        <ListItem
                            label="Heating Type"
                            value={heating?.heatingType}
                            align="horizontal"
                        />
                        <ListItem
                            label="Heating System"
                            value={heating?.heatingSystem}
                            align="horizontal"
                        />
                        <ListItem
                            label="Electricity Type"
                            value={heating?.electricityType}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <ListBooleanItem
                            label="Floor Heating"
                            status={heating?.floorHeating}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Air Conditioning"
                            status={heating?.airConditioning}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Solar Boiler"
                            status={heating?.solarBoiler}
                            align="horizontal"
                        />
                        <ListItem
                            label="Economy Electricity"
                            value={heating?.offPeakElectricity}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default HeatingSection;
