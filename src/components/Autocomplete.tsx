/**
 * Autocomplete that supports passing any kind of object value that has an id: number inside
 */

import MuiAutocomplete, {
    AutocompleteValue,
    AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { forwardRef, Ref, useCallback, useMemo } from "react";

interface ObjectWithId {
    id: number;
}

interface AutocompleteProps<
    T extends ObjectWithId,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false,
> extends Omit<
        MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
        "value" | "onChange" | "options"
    > {
    value?: Multiple extends true ? number[] : number; // id
    options: T[];
    onChange?: (value: Multiple extends true ? number[] : number) => void;
    onFreeSoloed?: (v: string) => void;
}

type OneOrMany<T, Multiple> = Multiple extends true ? T[] : T;

const isString = (value: ObjectWithId | string) => typeof value === "string";
const notString = (value: ObjectWithId | string) => typeof value !== "string";

const Autocomplete = <
    T extends ObjectWithId,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false,
>(
    props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    ref: Ref<HTMLDivElement>
) => {
    const { value, onChange, onFreeSoloed, ...rest } = props;

    const isOptionEqualToValue = useCallback(
        ({ id }: ObjectWithId) =>
            Array.isArray(value) ? value.includes(id) : id === value,
        [value]
    );

    const handleChange = useCallback(
        (
            _: any,
            v: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
        ) => {
            if (!v) return;

            const isArray = Array.isArray(v);

            const filtered = isArray
                ? (v.filter(notString) as ObjectWithId[]).map(({ id }) => id)
                : v;

            onChange?.(filtered as any);

            //
            //  Notify for a freeSolo value receival
            //
            if (!onFreeSoloed) return;

            const freeSoloed = isArray
                ? v.filter(isString).at(0)
                : typeof v === "string"
                  ? v
                  : undefined;
            if (!freeSoloed) return;

            onFreeSoloed?.(freeSoloed as string);
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
            value={calculated as OneOrMany<T, Multiple>}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={handleChange}
            {...rest}
        />
    );
};

const WithRef = forwardRef(Autocomplete) as <
    T extends ObjectWithId,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false,
>(
    props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
        ref?: Ref<unknown>;
    }
) => JSX.Element;

export type { AutocompleteProps };
export default WithRef;
