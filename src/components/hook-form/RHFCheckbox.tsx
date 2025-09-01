// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import {
    Checkbox,
    FormControlLabel,
    FormControlLabelProps,
    FormGroup,
} from "@mui/material";
import { DefaultTFuncReturn } from "i18next";

// ----------------------------------------------------------------------

interface RHFCheckboxProps
    extends Omit<FormControlLabelProps, "control" | "label"> {
    name: string;
    label?: string | DefaultTFuncReturn;
}

export const RHFCheckbox = ({
    name,
    label = "",
    ...other
}: RHFCheckboxProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            {...field}
                            checked={field.value}
                            sx={{ alignSelf: "start" }}
                        />
                    }
                    label={label}
                    {...other}
                />
            )}
        />
    );
};

// ----------------------------------------------------------------------

interface RHFMultiCheckboxProps
    extends Omit<FormControlLabelProps, "control" | "label"> {
    name: string;
    options: {
        label: string;
        value: any;
    }[];
}

export const RHFMultiCheckbox = ({
    name,
    options,
    ...other
}: RHFMultiCheckboxProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const onSelected = (option: string) =>
                    field.value.includes(option)
                        ? field.value.filter(
                              (value: string) => value !== option
                          )
                        : [...field.value, option];

                return (
                    <FormGroup>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={field.value.includes(
                                            option.value
                                        )}
                                        onChange={() =>
                                            field.onChange(
                                                onSelected(option.value)
                                            )
                                        }
                                    />
                                }
                                label={option.label}
                                {...other}
                            />
                        ))}
                    </FormGroup>
                );
            }}
        />
    );
};
