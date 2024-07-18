import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    InputAdornment,
} from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { FC } from "react";

type RHFSelectDemandFormProps = {
    name: string;
    label: string;
    adornment?: string;
    children: React.ReactNode;
    options?: number[];
};

const RHFSelectDemandForm: FC<RHFSelectDemandFormProps> = ({
    name,
    label,
    adornment,
    children,
    options,
}) => {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    const currentValue = field.value;

    return (
        <FormControl fullWidth variant="outlined" error={!!error}>
            <InputLabel>{label}</InputLabel>
            <Select
                {...field}
                displayEmpty
                endAdornment={
                    adornment && (
                        <InputAdornment
                            position="end"
                            sx={{
                                position: "absolute",
                                right: 30,
                                top: "calc(50%)",
                            }}
                        >
                            {adornment}
                        </InputAdornment>
                    )
                }
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            width: 160,
                        },
                    },
                }}
                renderValue={(value) => value?.toLocaleString("de-DE")}
            >
                {options?.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option?.toLocaleString("de-DE")}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RHFSelectDemandForm;
