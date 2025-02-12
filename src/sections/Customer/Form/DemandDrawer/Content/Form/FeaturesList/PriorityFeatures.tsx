import { Grid } from "@mui/material";
import { useCallback } from "react";
import { Residential, Commercial, Land, Other } from "./features";
import { useFormContext, useWatch } from "react-hook-form";

const getName = (index: number) => `demands[${index}].priorityFeatures`;
const getKeyName = (key: string, index: number) => `${getName(index)}.${key}`;

interface PriorityFeaturesProps {
    index: number;
    parentCategory: string;
}

const PriorityFeatures = ({ index, parentCategory }: PriorityFeaturesProps) => {
    const { setValue } = useFormContext();

    const features = useWatch({ name: getName(index) });

    const handleChange = useCallback(
        (key: string, checked: boolean) =>
            setValue(getKeyName(key, index), checked),
        []
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
