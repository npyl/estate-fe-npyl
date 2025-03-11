import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectChangeEvent, SelectProps } from "@mui/material";
import { ForwardedRef, forwardRef, ReactNode, useCallback } from "react";
import { NOT_SELECTED_VALUE } from "@/constants/select";

// ----------------------------------------------------------------------

type RenderProps<T> = SelectProps<T> & {
    /**
     * isEnum is a flag to enable custom handling for "" value. Basically, our backend doesn't support "" as value for enums, and we need to pass null if unset
     */
    isEnum?: boolean;
};

function RenderWithoutRef<T>(
    {
        isEnum = false,
        // ...
        value: _value,
        onChange: _onChange,
        // ...
        children,
        ...props
    }: RenderProps<T>,
    ref: ForwardedRef<HTMLSelectElement>
) {
    // INFO: normalise a null (e.g. default value for enums) to a
    const value = _value === null ? NOT_SELECTED_VALUE : _value;

    const onChange = useCallback(
        (e: SelectChangeEvent<T>, child: ReactNode) => {
            const v = e.target.value as any;

            if (isEnum && !v) {
                // INFO: force null for empty value when backend uses enum
                _onChange?.(null as any, child);
            } else {
                _onChange?.(e as any, child);
            }
        },
        [isEnum, _onChange]
    );

    if (!children) {
        return null;
    }

    return (
        <Select<T> ref={ref} value={value} onChange={onChange} {...props}>
            {children}
        </Select>
    );
}

const Render = forwardRef(RenderWithoutRef) as <T>(
    props: RenderProps<T> & { ref?: ForwardedRef<HTMLSelectElement> }
) => ReturnType<typeof RenderWithoutRef<T>>;

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
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Render<T>
                    ref={ref as any}
                    {...field}
                    error={!!error}
                    {...other}
                />
            )}
        />
    );
}

// ----------------------------------------------------------------------

export type { RHFSelectProps };
export default RHFSelect;
