import { Grid, GridProps } from "@mui/material";
import { useMemo } from "react";
import { RHFCheckbox } from "src/components/hook-form";

interface ICheckboxItemProps extends GridProps {
    label: string;
    value: string;
}

const CheckboxItem = ({ value, label, ...props }: ICheckboxItemProps) => {
    const name = useMemo(() => `features.${value}`, [value]);

    return (
        <Grid item xs={3} {...props}>
            <RHFCheckbox name={name} label={label} />
        </Grid>
    );
};

export default CheckboxItem;
