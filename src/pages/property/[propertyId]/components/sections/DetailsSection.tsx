import { IProperties } from "src/types/properties";

import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface DetailsSectionProps {
    data: IProperties;
}

const DetailsSection: React.FC<DetailsSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
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
                <Typography variant="h6">
                    {" "}
                    {t("Property Description")}
                </Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={4}>
                    <List>
                        <ListItem
                            label={t("Floor")}
                            value={details?.floor}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Layers")}
                            value={details?.layers}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Bedrooms")}
                            value={details?.bedrooms}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Kitchens")}
                            value={details?.kitchens}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Bathrooms")}
                            value={details?.bathrooms}
                            align="horizontal"
                        />
                        <ListItem
                            label={"W/C"}
                            value={details?.wc}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListItem
                            label={t("Living Rooms")}
                            value={details?.livingrooms}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Orientation")}
                            value={details?.orientation}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Floor Apartment")}
                            status={details?.floorApartment}
                            align="horizontal"
                        />

                        <ListBooleanItem
                            label={t("Penthouse")}
                            status={details?.penthouse}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Storeroom")}
                            status={details?.storeroom}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Attic")}
                            status={details?.attic}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Playroom")}
                            status={details?.playroom}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("View Type")}
                            value={details?.viewType}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Zone Type")}
                            value={details?.zoneType}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Land Use")}
                            value={details?.landUse}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Accessibility")}
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
