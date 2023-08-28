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

type ParentCategory = "Residential" | "Commercial" | "Land" | "Other";

const BASIC_DETAIL_FIELDS: { [key in ParentCategory]: string[] } = {
    Residential: [
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
    Commercial: [
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
    Land: [
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
    Other: [
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
    const [showPopup, setShowPopup] = useState(false);
    const { t } = useTranslation();
    const manager: IUser = data?.manager;
    const owner: ICustomer = data?.owner;
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOpenPopup = () => {
        setShowPopup((prevShowPopup) => !prevShowPopup);
    };

    const renderBasicDetails = (category: ParentCategory) => {
        const fieldsForCategory = BASIC_DETAIL_FIELDS[category];
        if (!fieldsForCategory) return null;

        return fieldsForCategory.map((field) => renderBasicDetailItem(field));
    };
    const renderBasicDetailItem = (field: string) => {
        switch (field) {
            case "ParentCategory":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Parent Category")}
                            value={data?.parentCategory}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Category":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Category")}
                            value={data?.category}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Area":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Area")}
                            value={data?.area + "m²"}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Plot Area":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Plot Area")}
                            value={data?.plotArea + "m²"}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Estimated Rend Price":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Estimated Rend Price")}
                            value={data?.estimatedRentPrice + "€"}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Available After":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Available After")}
                            value={data?.availableAfter}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Rental Period Start":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Rental Period Start")}
                            value={data?.rentalStart}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Rental Period End":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Rental Period End")}
                            value={data?.rentalEnd}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Current Rent Price":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Current Rent Price")}
                            value={data?.currentRentPrice + "€"}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Labels":
                return (
                    <Grid item xs={6}>
                        <ListLabelsItem
                            labels={data?.labels}
                            label={t("Labels")}
                        />
                    </Grid>
                );
            case "ROI":
                return (
                    <Grid item xs={6}>
                        <ListItem label={"ROI"}>
                            <Button
                                sx={{ flex: 1, float: "right", height: "22px" }}
                                variant="outlined"
                                onClick={handleOpenPopup}
                            >
                                ROI
                            </Button>
                        </ListItem>
                    </Grid>
                );
            case "Average Utilities":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Average Utilities")}
                            value={data?.averageUtils + " €"}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Year of Construction":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Year of Construction")}
                            value={data.construction?.yearOfConstruction}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Code":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Code")}
                            value={data?.code}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Price":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Price")}
                            value={data?.price + "€"}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Key Code":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("Key Code")}
                            value={data?.keyCode}
                            align="horizontal"
                        />
                    </Grid>
                );

            case "Manager":
                return (
                    <Grid item xs={6}>
                        <ListManagerItem manager={manager} />
                    </Grid>
                );

            case "State":
                return (
                    <Grid item xs={6}>
                        <ListItem
                            label={t("State")}
                            value={data?.state}
                            align="horizontal"
                        />
                    </Grid>
                );

            case "Rented":
                return (
                    <Grid item xs={6}>
                        <ListBooleanItem
                            label={t("Rented")}
                            status={data?.rented}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Debatable Price":
                return (
                    <Grid item xs={6}>
                        <ListBooleanItem
                            label={t("Debatable Price")}
                            status={data?.debatablePrice}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Auction":
                return (
                    <Grid item xs={6}>
                        <ListBooleanItem
                            label={t("Auction")}
                            status={data?.auction}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Buildable":
                return (
                    <Grid item xs={6}>
                        <ListBooleanItem
                            label={t("Buildable")}
                            status={data?.buildable}
                            align="horizontal"
                        />
                    </Grid>
                );
            case "Owner":
                return (
                    <Grid item xs={6}>
                        <ListOwnerItem owner={owner} />
                    </Grid>
                );
            default:
                return null;
        }
    };

    //... The rest of your component code remains unchanged

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
                        {renderBasicDetails(
                            data?.parentCategory as ParentCategory
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

// import React from "react";
// import { IProperties } from "src/types/properties";
// import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
// import { List, ListBooleanItem, ListItem } from "src/components/List";
// import { useTranslation } from "react-i18next";
// import { ParentCategory } from "src/types/properties";

// interface FeaturesProps {
//     data: {
//         features: any; // adjust this according to your data structure
//         parentCategory: ParentCategory;
//     };
// }

// // export type ParentCategory = "Residential" | "Commercial" | "Land" | "Other";

// const FEATURE_SETS: { [key in ParentCategory]: string[] } = {
//     Residential: [
//         "Category",
//         "Area",
//         "Plot Area",
//         "Estimated Rend Price",
//         "Available After",
//         "Rental Period Start",
//         "Rental Period End",
//         "Current Rent Price",

//         "Labels",
//         "ROI",
//         "Average Utilities",
//         "Year of Construction",
//         "Code",
//         "Price",
//         "Key Code",
//         "Manager",
//         "Owner",
//         "State",
//         "Rented",
//         "Debatable Price",
//         "Auction",
//         "Buildable",
//     ],
//     Commercial: [],
//     Land: [],
//     Other: [],
// };

// const Features: React.FC<FeaturesProps> = (props) => {
//     const { data } = props;
//     const { t } = useTranslation();
//     const features = data?.features;
//     const parentCategory = data?.parentCategory;

//     const renderFeatures = (category: ParentCategory) => {
//         const allowedFeatures = FEATURE_SETS[category];
//         if (!allowedFeatures) return null;

//         return allowedFeatures.map((feature) => (
//             <Grid item xs={4} key={feature}>
//                 <List>
//                     <ListBooleanItem
//                         label={t(feature)}
//                         status={features[convertFeatureToKey(feature)]}
//                         align="horizontal"
//                     />
//                 </List>
//             </Grid>
//         ));
//     };

//     function convertFeatureToKey(feature: string) {
//         return feature
//             .split(" ")
//             .map((word, index) =>
//                 index === 0
//                     ? word.toLowerCase()
//                     : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
//             )
//             .join("");
//     }

//     if (!data || !features) return null;

//     return (
//         <Paper elevation={10} sx={{ overflow: "auto" }}>
//             <Box
//                 sx={{
//                     px: 3,
//                     py: 1.5,
//                     display: "flex",
//                     justifyContent: "left",
//                 }}
//             >
//                 <Typography variant="h6">{t("Features")}</Typography>
//             </Box>
//             <Divider />
//             <Grid container>{renderFeatures(parentCategory)}</Grid>
//         </Paper>
//     );
// };

// export default Features;
