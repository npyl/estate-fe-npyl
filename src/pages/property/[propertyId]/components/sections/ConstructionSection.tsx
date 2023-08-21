import { IProperties } from "src/types/properties";

import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";

interface ConstructionSectionProps {
    data: IProperties;
}

const ConstructionSection: React.FC<ConstructionSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const construction = data?.construction;

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
                <Typography variant="h6"> {t("Construction")}</Typography>
            </Box>
            <Divider></Divider>
            <Grid container>
                <Grid item xs={4}>
                    <List>
                        <ListItem
                            label={t("Year Of Construction")}
                            value={construction?.yearOfConstruction}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Year Of Renovation")}
                            value={construction?.yearOfRenovation}
                            align="horizontal"
                        />
                        <ListItem
                            label={t("Total Floor Number")}
                            value={construction?.totalFloorNumber}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Under Construction")}
                            status={construction?.underConstruction}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Renovated")}
                            status={construction?.renovated}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Needs Renovation")}
                            status={construction?.needsRenovation}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Elevator")}
                            status={construction?.elevator}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Internal Stairs")}
                            status={construction?.internalStairs}
                            align="horizontal"
                        />
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List>
                        <ListBooleanItem
                            label={t("Newly Built")}
                            status={construction?.newlyBuilt}
                            align="horizontal"
                        />

                        <ListBooleanItem
                            label={t("Incomplete")}
                            status={construction?.incomplete}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Neoclassical")}
                            status={construction?.neoclassical}
                            align="horizontal"
                        />
                        <ListBooleanItem
                            label={t("Preserved")}
                            status={construction?.preserved}
                            align="horizontal"
                        />
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ConstructionSection;
