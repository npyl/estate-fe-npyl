// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Select, SelectChangeEvent, SelectProps } from "@mui/material";
import { useCallback } from "react";

// ----------------------------------------------------------------------

type RenderProps<T> = SelectProps<T> & {
    /**
     * isEnum is a flag to enable custom handling for "" value. Basically, our backend doesn't support "" as value for enums, and we need to pass null if unset
     */
    isEnum?: boolean;
};

function Render<T>({
    isEnum = false,
    onChange: _onChange,
    children,
    ...props
}: RenderProps<T>) {
    const onChange = useCallback(
        (e: SelectChangeEvent<T>, child: any) => {
            const v = e.target.value as any;

            if (isEnum && !v) {
                _onChange?.(null as any, child);
            } else {
                _onChange?.(v, child);
            }
        },
        [isEnum, _onChange]
    );

    if (!children) {
        return null;
    }

    return (
        <Select<T> onChange={onChange} {...props}>
            {children}
        </Select>
    );
}

// ----------------------------------------------------------------------

type RHFSelectProps<T> = RenderProps<T> & {
    name: string;
};

function RHFSelect<T>({ name, ...other }: RHFSelectProps<T>) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Render<T> {...field} error={!!error} {...other} />
            )}
        />
    );
}

// ----------------------------------------------------------------------

export type { RHFSelectProps };
export default RHFSelect;
