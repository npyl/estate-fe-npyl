import { FormControl, FormControlProps, InputLabel } from "@mui/material";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import { ForwardedRef, forwardRef, ReactElement } from "react";

type SelectProps<Value = unknown> = Omit<MuiSelectProps<Value>, "ref"> & {
    formControlProps?: FormControlProps;
};

const SelectComponent = <Value,>(
    { formControlProps, ...props }: SelectProps<Value>,
    ref: ForwardedRef<HTMLSelectElement>
) => (
    <FormControl
        variant="outlined"
        fullWidth={props.fullWidth}
        {...formControlProps}
    >
        <InputLabel>{props.label}</InputLabel>
        <MuiSelect ref={ref} {...props} />
    </FormControl>
);

const Select = forwardRef(SelectComponent) as <Value>(
    props: SelectProps<Value> & { ref?: ForwardedRef<HTMLSelectElement> }
) => ReactElement;

export * from "@mui/material/Select";
export type { SelectProps };
export default Select;
