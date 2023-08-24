import { Button, Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import {
    ListBooleanItem,
    ListItem,
    ListManagerItem,
    ListStatusItem,
} from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { IProperties } from "src/types/properties";
import { IUser } from "src/types/user";
import PopupWindow from "./PopopWindowROI";
import { ICustomer } from "src/types/customer";
import ListOwnerItem from "src/components/List/owner-item";
import { useTranslation } from "react-i18next";

interface BasicSectionProps {
    data: IProperties;
}

const BasicSection: React.FC<BasicSectionProps> = (props) => {
    const { data } = props;
    const [showPopup, setShowPopup] = useState(false);
    const { t } = useTranslation();
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleOpenPopup = () => {
        setShowPopup((prevShowPopup) => !prevShowPopup);
    };
    const details = data?.details;
    const areas = data?.areas;

    const manager: IUser = data?.manager;
    const owner: ICustomer = data?.owner;

    const isAvailable = (state: string) => {
        return state === "Sale" || state === "Rent";
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper elevation={10} sx={{ overflow: "auto" }}>
                    <Box
                        sx={{
                            px: 2.5,
                            py: 1,
                            display: "flex",
                            justifyContent: "left",
                        }}
                    >
                        <Typography variant="h6">
                            {t("Basic Details")}
                        </Typography>
                    </Box>
                    <Divider></Divider>
                    <Grid container>
                        <Grid item xs={6}>
                            <List>
                                <ListItem
                                    label={t("Category")}
                                    value={data?.category}
                                    align="horizontal"
                                />

                                <ListItem
                                    label={t("Area")}
                                    value={data?.area + "m²"}
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Plot Area")}
                                    value={data?.plotArea + "m²"}
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Estimated Rend Price")}
                                    value={data?.estimatedRentPrice + "€"}
                                    align="horizontal"
                                />

                                <ListItem
                                    label={t("Available After")}
                                    value={data?.availableAfter}
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Rental Period Start")}
                                    value={data?.rentalStart}
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Rental Period End")}
                                    value={data?.rentalEnd}
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Current Rent Price")}
                                    value={data?.currentRentPrice + "€"}
                                    align="horizontal"
                                />
                                <ListLabelsItem
                                    labels={data?.labels}
                                    label={t("Labels")}
                                />

                                <ListItem label={"ROI"}>
                                    <Button
                                        sx={{
                                            flex: 1,
                                            float: "right",
                                            height: "22px",
                                        }}
                                        variant="outlined"
                                        onClick={handleOpenPopup}
                                    >
                                        ROI
                                    </Button>
                                </ListItem>

                                {/* yer build na prosthetei??? */}
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <List>
                                <ListItem
                                    label={t("Average Utilities")}
                                    value={data?.averageUtils + " €"}
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Year of Construction")}
                                    value={
                                        data.construction?.yearOfConstruction
                                    }
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Code")}
                                    value={data?.code}
                                    align="horizontal"
                                />
                                <ListItem
                                    label={t("Price")}
                                    value={data?.price + "€"}
                                    align="horizontal"
                                />

                                <ListItem
                                    label={t("Key Code")}
                                    value={data?.keyCode}
                                    align="horizontal"
                                />

                                <ListManagerItem manager={manager} />
                                <ListOwnerItem owner={owner} />

                                <ListItem
                                    label={t("State")}
                                    value={data?.state}
                                    align="horizontal"
                                />
                                <ListBooleanItem
                                    label={t("Rented")}
                                    status={data?.rented}
                                    align="horizontal"
                                />
                                <ListBooleanItem
                                    label={t("Debatable Price")}
                                    status={data?.debatablePrice}
                                    align="horizontal"
                                />
                                <ListBooleanItem
                                    label={t("Auction")}
                                    status={data?.auction}
                                    align="horizontal"
                                />
                                <ListBooleanItem
                                    label={t("Buildable")}
                                    status={data?.buildable}
                                    align="horizontal"
                                />
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            {showPopup && (
                <Grid item xs={12}>
                    <Paper elevation={10} sx={{ overflow: "auto" }}>
                        <Box
                            sx={{
                                px: 2.5,
                                py: 1,
                                display: "flex",
                                justifyContent: "left",
                            }}
                        >
                            <Typography variant="h6">ROI</Typography>
                        </Box>
                        <Divider></Divider>
                        <Grid container>
                            <Grid item xs={12}>
                                <PopupWindow />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )}
        </Grid>
    );
};

export default BasicSection;
