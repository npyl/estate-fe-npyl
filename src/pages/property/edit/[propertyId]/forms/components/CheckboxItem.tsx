import { Grid } from "@mui/material";
import { useMemo } from "react";
import { RHFCheckbox } from "src/components/hook-form";

interface ICheckboxItemProps {
    label: string;
    value: string;
}

const CheckboxItem = ({ value, label }: ICheckboxItemProps) => {
    const name = useMemo(() => `features.${value}`, [value]);

    return (
        <Grid item xs={3}>
            <RHFCheckbox name={name} label={label} />
        </Grid>
    );
};

export default CheckboxItem;
