// form
import {
    Controller,
    ControllerRenderProps,
    FieldValues,
    Path,
    useFormContext,
} from "react-hook-form";
// @mui
import {
    Checkbox,
    CheckboxProps,
    FormControlLabel,
    FormControlLabelProps,
} from "@mui/material";
import { DefaultTFuncReturn } from "i18next";
import { ChangeEvent, FC, useCallback } from "react";

// ----------------------------------------------------------------------

type RenderProps<T extends FieldValues = FieldValues> = CheckboxProps & {
    field: ControllerRenderProps<T, Path<T>>;
};

const Render: FC<RenderProps> = ({
    onChange: _onChange0,
    field: { value, onChange: _onChange, ...field },
    ...props
}) => {
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>, b: boolean) => {
            _onChange0?.(e, b);
            _onChange(b);
        },
        [_onChange0, _onChange]
    );

    return (
        <Checkbox
            {...field}
            checked={value}
            onChange={onChange}
            sx={{ alignSelf: "start" }}
            {...props}
        />
    );
};

// ----------------------------------------------------------------------

interface RHFCheckboxProps extends Omit<CheckboxProps, "label"> {
    name: string;
    label?: string | DefaultTFuncReturn;
    labelPlacement?: FormControlLabelProps["labelPlacement"];
}

const RHFCheckbox: FC<RHFCheckboxProps> = ({ name, label = "", ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={<Render field={field} {...other} />}
                    label={label}
                />
            )}
        />
    );
};

export default RHFCheckbox;
