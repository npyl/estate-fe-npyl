import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import CodeSelect, { CodeSelectProps } from "./Code";
import TextField from "@mui/material/TextField";

interface RHFCodeProps
    extends Omit<CodeSelectProps, "value" | "renderInput" | "onChange"> {
    name: string;
    label?: string;
}

const RHFCode: FC<RHFCodeProps> = ({ name, label, ...props }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { ref, value, onChange, ...field },
                fieldState: { error },
            }) => (
                <CodeSelect
                    ref={ref as any}
                    {...field}
                    idValue={value}
                    onChange={(_, id) => onChange(id)}
                    renderInput={(params) => (
                        <TextField
                            label={label}
                            {...params}
                            error={Boolean(error)}
                            helperText={error?.message}
                        />
                    )}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFCodeProps };
export default RHFCode;
