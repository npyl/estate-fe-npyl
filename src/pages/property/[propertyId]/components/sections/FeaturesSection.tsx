import React from "react";
import { IProperties } from "src/types/properties";
import { Typography, Box, Paper, Divider, Grid } from "@mui/material";
import { List, ListBooleanItem, ListItem } from "src/components/List";
import { useTranslation } from "react-i18next";
import { ParentCategory } from "src/types/properties";

interface FeaturesProps {
    data: {
        features: any; // adjust this according to your data structure
        parentCategory: ParentCategory;
    };
}

// export type ParentCategory = "Residential" | "Commercial" | "Land" | "Other";

const FEATURE_SETS: { [key in ParentCategory]: string[] } = {
    Residential: [
        "Panoramic View",
        "Corner",
        "Facade",
        "Organized Garden",
        "Drilling",
        "Adapting to the Ground",
        "Pool",
        "Barbeque",
        "Sea View",
        "Mountain View",
        "Sea Front",
        "Smart Home",
        "Thermal Insulation",
        "Jacuzzi",
        "Internet",
        "Walkable Distance to Beach",
        "Quiet Area",
        "View",
        "Near Bus Route",
        "Guestroom",
        "Office",
        "Home Cinema",
        "Combined Kitchen and Dining Area",
        "Sound Insulation",
        "Veranda",
        "Well",
        "Masonry Fence",
        "Access for Disabled",
        "Tents",
        "Heated Pool",
        "Has 24 Hours Security",
        "CCTV",
        "Fire Detector",
        "Independent Heating Per Room",
        "Indoor Pool",
    ],
    Commercial: [
        "Organized Garden",
        "Has 24 Hours Security",
        "CCTV",
        "Internet",
        "Walkable Distance to Beach",
        "Fire Detector",
        "Quiet Area",
        "Sound Insulation",
        "Access for Disable",
        "Indepent Heating Per Room",
        "Adapting to the Ground",
        "Pool",
        "View",
        "Veranda",
        "Corner",
        "Facade",
    ],
    Land: [
        "Panoramic View",
        "Corner",
        "Facade",
        "Within City Plan",
        "Within Residential Zone",
    ],
    Other: ["Panoramic View", "Facade", "Loading Dock", "Veranda", "View"],
};

const Features: React.FC<FeaturesProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const features = data?.features;
    const parentCategory = data?.parentCategory;

    const renderFeatures = (category: ParentCategory) => {
        const allowedFeatures = FEATURE_SETS[category];
        if (!allowedFeatures) return null;

        return allowedFeatures.map((feature) => (
            <Grid item xs={4} key={feature}>
                <List>
                    <ListBooleanItem
                        label={t(feature)}
                        status={features[convertFeatureToKey(feature)]}
                        align="horizontal"
                    />
                </List>
            </Grid>
        ));
    };

    function convertFeatureToKey(feature: string) {
        return feature
            .split(" ")
            .map((word, index) =>
                index === 0
                    ? word.toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join("");
    }

    if (!data || !features) return null;

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
                <Typography variant="h6">{t("Features")}</Typography>
            </Box>
            <Divider />
            <Grid container>{renderFeatures(parentCategory)}</Grid>
        </Paper>
    );
};

export default Features;
