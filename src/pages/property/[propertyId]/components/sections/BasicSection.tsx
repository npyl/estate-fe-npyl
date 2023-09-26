import { Button, Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {
    ListBooleanItem,
    ListItem,
    ListManagerItem,
} from "src/components/List";
import ListLabelsItem from "src/components/List/labels-item";
import { IProperties, ParentCategory } from "src/types/properties";
import { IUser } from "src/types/user";
import PopupWindow from "./PopopWindowROI";
import { ICustomer } from "src/types/customer";
import ListOwnerItem from "src/components/List/owner-item";
import { useTranslation } from "react-i18next";

interface BasicSectionProps {
    data: IProperties;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "ParentCategory",
        "Category",
        "Area",
        "Plot Area",
        "Estimated Rend Price",
        "Available After",
        "Rental Period Start",
        "Rental Period End",
        "Current Rent Price",
        "Labels",
        "ROI",
        "Average Utilities",
        "Year of Construction",
        "Code",
        "Price",
        "Key Code",
        "Owner",
        "State",
        "Manager",
        "Rented",
        "Debatable Price",
        "Auction",
    ],
    COMMERCIAL: [
        "ParentCategory",
        "Category",
        "Area",
        "Plot Area",
        "Estimated Rend Price",
        "Available After",
        "Rental Period Start",
        "Rental Period End",
        "Current Rent Price",
        "Labels",
        "ROI",
        "Average Utilities",
        "Year of Construction",
        "Code",
        "Price",
        "Key Code",
        "Owner",
        "State",
        "Manager",
        "Rented",
        "Debatable Price",
        "Auction",
    ],
    LAND: [
        "ParentCategory",
        "Category",
        "Area",
        "Plot Area",
        "Estimated Rend Price",
        "Available After",
        "Rental Period Start",
        "Rental Period End",
        "Current Rent Price",
        "Labels",
        "ROI",
        "Code",
        "Price",
        "Key Code",
        "Owner",
        "State",
        "Manager",
        "Rented",
        "Debatable Price",
        "Auction",
        "Buildable",
    ],
    OTHER: [
        "ParentCategory",
        "Category",
        "Area",
        "Plot Area",
        "Estimated Rent Price",
        "Available After",
        "Rental Period Start",
        "Rental Period End",
        "Current Rent Price",
        "Labels",
        "ROI",
        "Average Utilities",
        "Code",
        "Price",
        "Key Code",
        "Manager",
        "State",
        "Owner",
        "Rented",
        "Debatable Price",
        "Auction",
    ],
};

const BasicSection: React.FC<BasicSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();

    const [showPopup, setShowPopup] = useState(false);

    const manager: IUser = data?.manager;
    const owner: ICustomer = data?.owner;

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOpenPopup = () => {
        setShowPopup((prevShowPopup) => !prevShowPopup);
    };

    const renderHalfOfFields = (fields: string[], from: number, to: number) => (
        <Grid item xs={6}>
            <List>
                {fields
                    .slice(from, to)
                    .map((field) => renderBasicDetailItem(field))}
            </List>
        </Grid>
    );

    const renderBasicDetails = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;

        const half = Math.ceil(fieldsForCategory.length / 2);

        return (
            <Grid container>
                {renderHalfOfFields(fieldsForCategory, 0, half)}
                {renderHalfOfFields(
                    fieldsForCategory,
                    half,
                    fieldsForCategory.length
                )}
            </Grid>
        );
    };
    const renderBasicDetailItem = (field: string) => {
        switch (field) {
            case "ParentCategory":
                return (
                    <ListItem
                        label={t("Parent Category")}
                        value={data?.parentCategory.value || "-"}
                        align="horizontal"
                    />
                );
            case "Category":
                return (
                    <ListItem
                        label={t("Category")}
                        value={data?.category.value || "-"}
                        align="horizontal"
                    />
                );
            case "Area":
                return (
                    <ListItem
                        label={t("Area")}
                        value={data?.area ? `${data?.area}m²` : "-"}
                        align="horizontal"
                    />
                );
            case "Plot Area":
                return (
                    <ListItem
                        label={t("Plot Area")}
                        value={data?.plotArea ? `${data?.plotArea}m²` : "-"}
                        align="horizontal"
                    />
                );
            case "Estimated Rent Price":
                return (
                    <ListItem
                        label={t("Estimated Rent Price")}
                        value={
                            data?.estimatedRentPrice
                                ? `${data?.estimatedRentPrice}€`
                                : "-"
                        }
                        align="horizontal"
                    />
                );
            case "Available After":
                return (
                    <ListItem
                        label={t("Available After")}
                        value={data?.availableAfter || "-"}
                        align="horizontal"
                    />
                );
            case "Rental Period Start":
                return (
                    <ListItem
                        label={t("Rental Period Start")}
                        value={data?.rentalStart || "-"}
                        align="horizontal"
                    />
                );
            case "Rental Period End":
                return (
                    <ListItem
                        label={t("Rental Period End")}
                        value={data?.rentalEnd || "-"}
                        align="horizontal"
                    />
                );
            case "Current Rent Price":
                return (
                    <ListItem
                        label={t("Current Rent Price")}
                        value={
                            data?.currentRentPrice
                                ? `${data?.currentRentPrice}€`
                                : "-"
                        }
                        align="horizontal"
                    />
                );
            case "Labels":
                return (
                    <ListLabelsItem
                        labels={data?.labels || []}
                        label={t("Labels")}
                    />
                );
            case "ROI":
                return (
                    <ListItem label={"ROI"}>
                        <Button
                            sx={{ flex: 1, float: "right", height: "22px" }}
                            variant="outlined"
                            onClick={handleOpenPopup}
                        >
                            ROI
                        </Button>
                    </ListItem>
                );
            case "Average Utilities":
                return (
                    <ListItem
                        label={t("Average Utilities")}
                        value={
                            data?.averageUtils ? `${data?.averageUtils} €` : "-"
                        }
                        align="horizontal"
                    />
                );
            case "Year of Construction":
                return (
                    <ListItem
                        label={t("Year of Construction")}
                        value={data?.construction?.yearOfConstruction || "-"}
                        align="horizontal"
                    />
                );
            case "Code":
                return (
                    <ListItem
                        label={t("Code")}
                        value={data?.code || "-"}
                        align="horizontal"
                    />
                );
            case "Price":
                return (
                    <ListItem
                        label={t("Price")}
                        value={data?.price ? `${data?.price}€` : "-"}
                        align="horizontal"
                    />
                );
            case "Key Code":
                return (
                    <ListItem
                        label={t("Key Code")}
                        value={data?.keyCode || "-"}
                        align="horizontal"
                    />
                );

            case "Manager":
                return <ListManagerItem manager={manager} />;

            case "State":
                return (
                    <ListItem
                        label={t("State")}
                        value={data?.state.value || "-"}
                        align="horizontal"
                    />
                );
            case "Rented":
                return (
                    <ListBooleanItem
                        label={t("Rented")}
                        status={data?.rented ?? "-"}
                        align="horizontal"
                    />
                );
            case "Debatable Price":
                return (
                    <ListBooleanItem
                        label={t("Debatable Price")}
                        status={data?.debatablePrice ?? "-"}
                        align="horizontal"
                    />
                );
            case "Auction":
                return (
                    <ListBooleanItem
                        label={t("Auction")}
                        status={data?.auction ?? "-"}
                        align="horizontal"
                    />
                );
            case "Buildable":
                return (
                    <ListBooleanItem
                        label={t("Buildable")}
                        status={data?.buildable ?? "-"}
                        align="horizontal"
                    />
                );
            case "Owner":
                return <ListOwnerItem owner={owner} />;
            default:
                return null;
        }
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
                    <Divider />
                    <Grid container>
                        {renderBasicDetails(
                            data?.parentCategory.key as ParentCategory
                        )}
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
