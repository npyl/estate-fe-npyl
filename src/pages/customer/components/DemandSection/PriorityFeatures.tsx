import { Grid } from "@mui/material";
import { useCallback } from "react";

import { Residential, Commercial, Land, Other } from "./features";

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
                        <Residential
                            features={features}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "LAND" && (
                        <Land features={features} onChange={handleChange} />
                    )}
                    {parentCategory === "COMMERCIAL" && (
                        <Commercial
                            features={features}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "OTHER" && (
                        <Other features={features} onChange={handleChange} />
                    )}
                </Grid>
            </Grid>
        </>
    );
};
export default PriorityFeatures;
