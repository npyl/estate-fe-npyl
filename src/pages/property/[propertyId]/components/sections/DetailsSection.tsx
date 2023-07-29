import { IProperties } from "src/types/properties";

import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";

interface DetailsSectionProps {
    data: IProperties;
}

const DetailsSection: React.FC<DetailsSectionProps> = (props) => {
    const { data } = props;
    const details = data?.details;

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
                <Typography variant="h6"> Details</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={4}>
                    <List>
                        <ListItem
                            label="Floor"
                            value={details?.floor}
                            align="horizontal"
                        />
                        <ListItem
                            label="Layers"
                            value={details?.layers}
                            align="horizontal"
                        />
                        <ListItem
                            label="Bedrooms"
                            value={details?.bedrooms}
                            align="horizontal"
                        />
                        <ListItem
                            label="Kitchens"
                            value={details?.kitchens}
                            align="horizontal"
                        />
                        <ListItem
                            label="Bathrooms"
                            value={details?.bathrooms}
                            align="horizontal"
                        />
                        <ListItem
                            label="W/C"
                            value={details?.wc}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListItem
                            label="Living Rooms"
                            value={details?.livingrooms}
                            align="horizontal"
                        />
                        <ListItem
                            label="Orientation"
                            value={details?.orientation}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Floor Apartment"
                            status={details?.floorApartment}
                            align="horizontal"
                        />

                        <ListBooleanItem
                            label="Penthouse"
                            status={details?.penthouse}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Storeroom"
                            status={details?.storeroom}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label="Attic"
                            status={details?.attic}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label="Playroom"
                            status={details?.playroom}
                            align="horizontal"
                        />
                        <ListItem
                            label="View Type"
                            value={details?.viewType}
                            align="horizontal"
                        />
                        <ListItem
                            label="Zone Type"
                            value={details?.zoneType}
                            align="horizontal"
                        />
                        <ListItem
                            label="Land Use"
                            value={details?.landUse}
                            align="horizontal"
                        />
                        <ListItem
                            label="Accessibility"
                            value={details?.accessibility}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DetailsSection;
