/**
 * Autocomplete component with the ability to pass any `options` you like,
 * but still keep the value as number corresponding to an option's `id`
 */

import MuiAutocomplete, {
    AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { forwardRef, Ref, useCallback } from "react";

interface ObjectWithId {
    id: number;
}

export interface AutocompleteProps<T extends ObjectWithId = ObjectWithId>
    extends Omit<
        MuiAutocompleteProps<T, false, false, false>,
        "value" | "onChange" | "options"
    > {
    value?: number; // id
    options: T[];
    onChange?: (id: number) => void;
}

const Autocomplete = <T extends ObjectWithId>(
    props: AutocompleteProps<T>,
    ref: Ref<HTMLDivElement>
) => {
    const { value, onChange, ...rest } = props;

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
            ref={ref}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={handleChange}
            {...rest}
        />
    );
};

const WithRef = forwardRef(Autocomplete) as <T extends ObjectWithId>(
    props: AutocompleteProps<T> & { ref?: Ref<unknown> }
) => JSX.Element;

export default WithRef;
