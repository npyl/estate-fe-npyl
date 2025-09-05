import isFalsy from "@/utils/isFalsy";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

// INFO: null is handled nicely by MUI Autocomplete; undefined puts in uncontrolled state
const getSafeValue = (value: any) => (isFalsy(value) ? null : value);

interface RHFAutocompleteProps<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
> extends AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo> {
    name: string;
}

const RHFAutocomplete = <
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
>({
    name,
    ...props
}: RHFAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
                <Autocomplete
                    {...field}
                    value={getSafeValue(value)}
                    onChange={(_: any, v) => onChange(v)}
                    {...props}
                />
            )}
        />
    );
};

export type { RHFAutocompleteProps };
export default RHFAutocomplete;
