import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { ElementType, FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFAutocompleteProps<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo> {
    name: string;
}

const RHFAutocomplete = <
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>({
    name,
    ...props
}: RHFAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                    {...field}
                    onChange={(_: any, v) => onChange(v)}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFAutocompleteProps };
export default RHFAutocomplete;
