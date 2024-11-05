// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import ToggleButtonGroup, {
    ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup";
import { FC } from "react";

interface RHFToggleButtonGroup extends ToggleButtonGroupProps {
    name: string;
}

const RHFToggleButtonGroup: FC<RHFToggleButtonGroup> = ({ name, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => <ToggleButtonGroup {...field} {...other} />}
        />
    );
};

export default RHFToggleButtonGroup;
