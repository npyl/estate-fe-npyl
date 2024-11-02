import MuiAutocomplete, {
    AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { useCallback } from "react";

interface ObjectWithId {
    id: number;
}

interface AutocompleteProps<T extends ObjectWithId = ObjectWithId>
    extends Omit<
        MuiAutocompleteProps<T, false, false, false>,
        "value" | "onChange" | "options"
    > {
    value?: number; // id
    options: T[];
    onChange?: (id: number) => void;
}

function Autocomplete<T extends ObjectWithId = ObjectWithId>({
    value,
    onChange,
    ...props
}: AutocompleteProps<T>) {
    const isOptionEqualToValue = useCallback(
        ({ id }: ObjectWithId) => id === value,
        [value]
    );

    const handleChange = useCallback(
        (_: any, v: T | null) => {
            if (!v) return;
            onChange?.(v.id);
        },
        [onChange]
    );

    return (
        <MuiAutocomplete
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={handleChange}
            {...props}
        />
    );
}

export default Autocomplete;
