import FormControlLabel, {
    FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import { Controller, useFormContext } from "react-hook-form";
import IOSSwitch from "@/components/iOSSwitch";
import { FC } from "react";

interface RHFIOSSwitch extends Omit<FormControlLabelProps, "control"> {
    name: string;
}

const RHFIOSSwitch: FC<RHFIOSSwitch> = ({ name, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
                <FormControlLabel
                    labelPlacement="start"
                    checked={value}
                    onChange={(_, b) => onChange(b)}
                    control={<IOSSwitch />}
                    {...field}
                    {...props}
                />
            )}
        />
    );
};

export default RHFIOSSwitch;
