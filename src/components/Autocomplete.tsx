/**
 * Autocomplete that supports passing any kind of object value that has an id: number inside
 */

import MuiAutocomplete, {
    AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { forwardRef, Ref, useCallback, useMemo } from "react";

interface ObjectWithId {
    id: number;
}

type TMultiple = boolean;

export interface AutocompleteProps<
    T extends ObjectWithId,
    Multiple extends TMultiple = false
> extends Omit<
        MuiAutocompleteProps<T, Multiple, false, false>,
        "value" | "onChange" | "options"
    > {
    value?: Multiple extends true ? number[] : number; // id
    options: T[];
    onChange?: (value: Multiple extends true ? number[] : number) => void;
}

const Autocomplete = <
    T extends ObjectWithId,
    Multiple extends TMultiple = false
>(
    props: AutocompleteProps<T, Multiple>,
    ref: Ref<HTMLDivElement>
) => {
    const { value, onChange, ...rest } = props;

    const isOptionEqualToValue = useCallback(
        ({ id }: ObjectWithId) =>
            Array.isArray(value) ? value.includes(id) : id === value,
        [value]
    );

    const handleChange = useCallback(
        (_: any, v: T | T[] | null) => {
            if (!v) return;
            const ids = Array.isArray(v) ? v.map(({ id }) => id) : v.id;
            onChange?.(ids as any);
        },
        [onChange]
    );

    const calculated = useMemo(() => {
        if (Array.isArray(value)) {
            return props.options?.filter(({ id }) =>
                (value as number[]).includes(id)
            );
        }

        return props.options?.find(({ id }) => value === id) || null!;
    }, [props.options, value]);

    return (
        <MuiAutocomplete
            ref={ref}
            value={calculated as any} // TODO: fix this!
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={handleChange}
            {...rest}
        />
    );
};

const WithRef = forwardRef(Autocomplete) as <
    T extends ObjectWithId,
    Multiple extends TMultiple = false
>(
    props: AutocompleteProps<T, Multiple> & { ref?: Ref<unknown> }
) => JSX.Element;

export default WithRef;
