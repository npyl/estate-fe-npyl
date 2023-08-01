import { Box, Grid, Paper, Typography } from "@mui/material";

import FeaturesSection from "./DemandForm/Features";
import FeaturesForCommercialSection from "./DemandForm/FeaturesForCommercial";
import FeaturesForLandSection from "./DemandForm/FeaturesForLand";
import FeaturesForOtherSection from "./DemandForm/FeaturesForOther";

import { useDispatch } from "react-redux";
import { setPriorityFeature } from "src/slices/customer";
import { useTranslation } from "react-i18next";

interface PriorityFeaturesProps {
    parentCategory: string;
}

const PriorityFeatures = ({ parentCategory }: PriorityFeaturesProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = (key: string, checked: boolean) => {
        dispatch(setPriorityFeature({ key }));
    };

    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0.5,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Priority Feautures")}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    {parentCategory === "Residential" && (
                        <FeaturesSection
                            priorityFeaturesMode
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Land" && (
                        <FeaturesForLandSection
                            priorityFeaturesMode
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Commercial" && (
                        <FeaturesForCommercialSection
                            priorityFeaturesMode
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Other" && (
                        <FeaturesForOtherSection
                            priorityFeaturesMode
                            onChange={handleChange}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};
export default PriorityFeatures;
