import { Box, Grid, Paper, Typography } from "@mui/material";

import FeaturesSection from "./DemandForm/Features";
import FeaturesForCommercialSection from "./DemandForm/FeaturesForCommercial";
import FeaturesForLandSection from "./DemandForm/FeaturesForLand";
import FeaturesForOtherSection from "./DemandForm/FeaturesForOther";

import { useDispatch } from "react-redux";
import { setNonPriorityFeature } from "src/slices/customer";
import { useTranslation } from "react-i18next";
import { IPropertyFeatures } from "src/types/features";

interface NonPriorityFeatures {
    index: number;
    parentCategory: string;
}

const NonPriorityFeatures = ({
    index,
    parentCategory,
}: NonPriorityFeatures) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = (key: string, checked: boolean) =>
        dispatch(
            setNonPriorityFeature({
                index,
                key: key as keyof IPropertyFeatures,
            })
        );

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
                <Typography variant="h6">
                    {t("Non-Priority Feautures")}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    {parentCategory === "Residential" && (
                        <FeaturesSection
                            index={index}
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Land" && (
                        <FeaturesForLandSection
                            index={index}
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Commercial" && (
                        <FeaturesForCommercialSection
                            index={index}
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Other" && (
                        <FeaturesForOtherSection
                            index={index}
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};
export default NonPriorityFeatures;
