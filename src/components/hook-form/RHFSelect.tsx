// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Select, SelectProps } from "@mui/material";

// ----------------------------------------------------------------------

type RHFSelectProps<T> = SelectProps<T> & {
    name: string;
    children: React.ReactNode;
};

function RHFSelect<T>({ name, children, ...other }: RHFSelectProps<T>) {
    const { control } = useFormContext();
    if (!children) {
        return null;
    }
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Select<T> {...field} error={!!error} {...other}>
                    {children}
                </Select>
            )}
        />
    );
}

export type { RHFSelectProps };
export default RHFSelect;
