import { Grid } from "@mui/material";
import { useCallback } from "react";

import FeaturesSection from "./DemandForm/Features";
import FeaturesForCommercialSection from "./DemandForm/FeaturesForCommercial";
import FeaturesForLandSection from "./DemandForm/FeaturesForLand";
import FeaturesForOtherSection from "./DemandForm/FeaturesForOther";

import { useFormContext } from "react-hook-form";

interface PriorityFeaturesProps {
    index: number;
    parentCategory: string;
}

const PriorityFeatures = ({ index, parentCategory }: PriorityFeaturesProps) => {
    const { watch, setValue } = useFormContext();

    const getName = useCallback(
        (key: string) => `demands[${index}].priorityFeatures.${key}`,
        [index]
    );

    const features = watch(`demands[${index}].priorityFeatures`);

    const handleChange = useCallback(
        (key: string, checked: boolean) => setValue(getName(key), checked),
        [getName]
    );

    return (
        <>
            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    {parentCategory === "RESIDENTIAL" && (
                        <FeaturesSection
                            features={features}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "LAND" && (
                        <FeaturesForLandSection
                            features={features}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "COMMERCIAL" && (
                        <FeaturesForCommercialSection
                            features={features}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "OTHER" && (
                        <FeaturesForOtherSection
                            features={features}
                            onChange={handleChange}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
};
export default PriorityFeatures;
