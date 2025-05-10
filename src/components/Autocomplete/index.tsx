/**
 * Autocomplete that supports passing any kind of object value that has an id: number inside
 */

import MuiAutocomplete, {
    AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import { forwardRef, Ref, useCallback, useMemo } from "react";
import { ObjectWithId } from "./types";
import useOnChange from "./useOnChange";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
import useFreeSoloRenderer from "./useFreeSoloRenderer";

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

    // freeSolo'ed values
    freeSoloed?: string[];
    onFreeSoloed?: (v: string) => void;
    onFreeSoloedDelete?: (idx: number) => void;
}

type OneOrMany<T, Multiple> = Multiple extends true ? T[] : T;

const Autocomplete = <
    T extends ObjectWithId,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false,
>(
    props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    ref: Ref<HTMLDivElement>
) => {
    const {
        value,
        freeSoloed = [],
        onChange: _onChange,
        onFreeSoloed,
        onFreeSoloedDelete,
        ...rest
    } = props;

    const isOptionEqualToValue = useCallback(
        ({ id }: ObjectWithId) =>
            Array.isArray(value) ? value.includes(id) : id === value,
        [value]
    );

    const calculated = useMemo(() => {
        if (Array.isArray(value)) {
            return props.options?.filter(({ id }) =>
                (value as number[]).includes(id)
            );
        }

        return props.options?.find(({ id }) => value === id) || null!;
    }, [props.options, value]);

    const onChange = useOnChange<T, Multiple, DisableClearable, FreeSolo>(
        _onChange,
        freeSoloed,
        onFreeSoloed
    );

    const [localRef, { onRef }] = useForwardedLocalRef(ref);
    useFreeSoloRenderer(localRef, freeSoloed, onFreeSoloedDelete);

    return (
        <MuiAutocomplete
            ref={onRef}
            value={calculated as OneOrMany<T, Multiple>}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={onChange}
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
