import { Button, Divider, Grid, List, Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { FC } from "react";
import {
    ListBooleanItem,
    ListItem,
    ListManagerItem,
    ListOwnerItem,
    ListLabelsItem,
    ListDateItem,
} from "@/components/List";
import { IProperties, ParentCategory } from "@/types/properties";
import { IUser } from "@/types/user";
import { ICustomer } from "@/types/customer";
import { useTranslation } from "react-i18next";

interface BasicSectionProps {
    data: IProperties;
}
interface BasicDetailItemProps {
    field: string;
}

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    RESIDENTIAL: [
        "Visitors",
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
        "Exclusive",
    ],
    COMMERCIAL: [
        "Visitors",
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
        "Exclusive",
    ],
    LAND: [
        "Visitors",
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
        "Exclusive",
    ],
    OTHER: [
        "Visitors",
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
        "Exclusive",
    ],
};

const formatNumberWithDots = (number: number) => {
    return new Intl.NumberFormat("de-DE").format(number);
};

const BasicSection: React.FC<BasicSectionProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();

    const manager: IUser = data?.manager;
    const owner: ICustomer = data?.owner;

    const renderHalfOfFields = (fields: string[], from: number, to: number) => (
        <Grid item xs={12} sm={6}>
            <List sx={{ p: 0 }}>
                {fields.slice(from, to).map((field, i) => (
                    <BasicDetailItem field={field} key={i} />
                ))}
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
    const BasicDetailItem: FC<BasicDetailItemProps> = ({ field }) => {
        switch (field) {
            case "Visitors":
                return (
                    <ListItem
                        label={t("Visitors")}
                        value={data?.visitors ?? "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "ParentCategory":
                return (
                    <ListItem
                        label={t("Parent Category")}
                        value={t(data?.parentCategory.value) || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Category":
                return (
                    <ListItem
                        label={t("Category")}
                        value={t(data?.category.value) || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Area":
                return (
                    <ListItem
                        label={t("Living Space")}
                        value={data?.area ? `${data?.area}m²` : "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Exclusive":
                return (
                    <ListBooleanItem
                        label={t("Exclusive")}
                        status={data?.exclusive ?? "-"}
                    />
                );
            case "Plot Area":
                return (
                    <ListItem
                        label={t("Plot Size")}
                        value={data?.plotArea ? `${data?.plotArea}m²` : "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Estimated Rent Price":
                return (
                    <ListItem
                        label={t("Estimated Rent Price")}
                        value={
                            data?.estimatedRentPrice
                                ? `${data?.estimatedRentPrice.toLocaleString(
                                      "de-DE"
                                  )}€`
                                : "-"
                        }
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Available After":
                return (
                    <ListDateItem
                        label={t("Available After")}
                        value={data?.availableAfter}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Rental Period Start":
                return (
                    <ListDateItem
                        label={t("Rental Period Start")}
                        value={data?.rentalStart}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Rental Period End":
                return (
                    <ListDateItem
                        label={t("Rental Period End")}
                        value={data?.rentalEnd}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Current Rent Price":
                return (
                    <ListItem
                        label={t("Current Rent Price")}
                        value={
                            data?.currentRentPrice
                                ? `${data?.currentRentPrice.toLocaleString(
                                      "de-DE"
                                  )}€`
                                : "-"
                        }
                    />
                );
            case "Labels":
                return (
                    <ListLabelsItem
                        labels={data?.labels || []}
                        label={t("Labels")}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "ROI":
                return (
                    <ListItem label={"ROI"} sx={{ minHeight: "60px" }}>
                        <Button
                            sx={{ height: "23px" }}
                            variant="outlined"
                            // onClick={handleOpenPopup}
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
                            data?.averageUtils
                                ? `${data?.averageUtils.toLocaleString(
                                      "de-DE"
                                  )}€`
                                : "-"
                        }
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Year of Construction":
                return (
                    <ListItem
                        label={t("Year of Construction")}
                        value={data?.construction?.yearOfConstruction || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Code":
                return (
                    <ListItem
                        label={t("Code")}
                        value={data?.code || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Price":
                return (
                    <ListItem
                        label={t("Price")}
                        value={
                            data?.price
                                ? `${data?.price.toLocaleString("de-DE")}€`
                                : "-"
                        }
                        hidePrice={data?.hidePrice}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Key Code":
                return (
                    <ListItem
                        label={t("Key Code")}
                        value={data?.keyCode || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );

            case "Manager":
                if (data.manager != null)
                    return (
                        <ListManagerItem
                            manager={manager}
                            sx={{ minHeight: "61px" }}
                        />
                    );
                else
                    return (
                        <ListItem
                            label={t("Manager")}
                            value={"-"} // Displaying '-' when managedBy is null
                            sx={{ minHeight: "61px" }}
                        />
                    );

            case "State":
                return (
                    <ListItem
                        label={t("State")}
                        value={t(data?.state.value) || "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Rented":
                return (
                    <ListBooleanItem
                        label={t("Rented")}
                        status={data?.rented ?? "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Debatable Price":
                return (
                    <ListBooleanItem
                        label={t("Debatable Price")}
                        status={data?.debatablePrice ?? "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Auction":
                return (
                    <ListBooleanItem
                        label={t("Auction")}
                        status={data?.auction ?? "-"}
                        sx={{ minHeight: "60px" }}
                    />
                );
            case "Buildable":
                return (
                    <ListBooleanItem
                        label={t("Buildable")}
                        status={data?.buildable ?? "-"}
                    />
                );
            case "Owner":
                if (data.owner != null)
                    return (
                        <ListOwnerItem
                            owner={owner}
                            sx={{ minHeight: "60px" }}
                        />
                    );
                else
                    return (
                        <ListItem
                            label={t("Owner")}
                            value={"-"} // Displaying '-' when managedBy is null
                            sx={{ minHeight: "60px" }}
                        />
                    );
            default:
                return null;
        }
    };

    return (
        <Grid
            container
            spacing={1}
            sx={{ mt: data.images.length === 0 ? 0 : null }}
        >
            <Grid item xs={12}>
                <Paper elevation={10} sx={{ overflow: "hidden" }}>
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
                    {renderBasicDetails(
                        data?.parentCategory.key as ParentCategory
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default BasicSection;
