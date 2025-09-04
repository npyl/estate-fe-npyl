import { Controller, useFormContext } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { ForwardedRef, forwardRef, ReactNode, useCallback } from "react";
import { NOT_SELECTED_VALUE } from "@/constants/select";
import Select, { SelectProps } from "@/components/Select";
import isFalsy from "@/utils/isFalsy";

// ----------------------------------------------------------------------

type RenderProps<T> = SelectProps<T> & {
    /**
     * Enable custom handling for "" value. Basically, our backend doesn't support "" as value for enums, and we need to pass null if unset
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
    const value = isFalsy(_value) ? NOT_SELECTED_VALUE : _value;

    const onChange = useCallback(
        (e: SelectChangeEvent<T>, child: ReactNode) => {
            const v = e.target.value as any;

            // INFO: multiple & we want to clear
            const isMultipleClear =
                props.multiple &&
                Array.isArray(v) &&
                v.includes(NOT_SELECTED_VALUE);

            // INFO: Enum & we want to clear
            const isEnumClear =
                !props.multiple && isEnum && v === NOT_SELECTED_VALUE;

            if (isMultipleClear) {
                _onChange?.([] as any, child);
            } else if (isEnumClear) {
                // INFO: force null for empty value when backend uses enum
                _onChange?.(null as any, child);
            } else {
                _onChange?.(e as any, child);
            }
        },
        [props.multiple, isEnum, _onChange]
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
