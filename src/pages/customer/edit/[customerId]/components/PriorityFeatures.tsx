import { Box, Grid, Typography } from "@mui/material";

import FeaturesSection from "./DemandForm/Features";
import FeaturesForCommercialSection from "./DemandForm/FeaturesForCommercial";
import FeaturesForLandSection from "./DemandForm/FeaturesForLand";
import FeaturesForOtherSection from "./DemandForm/FeaturesForOther";

import { useDispatch } from "react-redux";
import { setPriorityFeature } from "src/slices/customer";
import { useTranslation } from "react-i18next";
import { IPropertyFeatures } from "src/types/features";

interface PriorityFeaturesProps {
    index: number;
    parentCategory: string;
}

const PriorityFeatures = ({ index, parentCategory }: PriorityFeaturesProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleChange = (key: string, checked: boolean) => {
        dispatch(
            setPriorityFeature({ index, key: key as keyof IPropertyFeatures })
        );
    };

    return (
        <>
            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    {parentCategory === "RESIDENTIAL" && (
                        <FeaturesSection
                            index={index}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "LAND" && (
                        <FeaturesForLandSection
                            index={index}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "COMMERCIAL" && (
                        <FeaturesForCommercialSection
                            index={index}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "OTHER" && (
                        <FeaturesForOtherSection
                            index={index}
                            onChange={handleChange}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
};
export default PriorityFeatures;
