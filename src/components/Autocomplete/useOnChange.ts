import { ObjectWithId } from "./types";
import { AutocompleteValue } from "@mui/material/Autocomplete";
import { useCallback } from "react";

const isString = (value: ObjectWithId | string) => typeof value === "string";
const notString = (value: ObjectWithId | string) => typeof value !== "string";

const useOnChange = <
    T extends ObjectWithId,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false,
>(
    _onChange:
        | ((value: Multiple extends true ? number[] : number) => void)
        | undefined,
    _freeSoloed: string[],
    onFreeSoloed?: (v: string) => void
) => {
    const onChange = useCallback(
        (
            _: any,
            v: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>
        ) => {
            if (!v) return;

            const isArray = Array.isArray(v);

            const ids = isArray
                ? (v.filter(notString) as ObjectWithId[]).map(({ id }) => id)
                : v;

            _onChange?.(ids as any);

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

            onFreeSoloed(freeSoloed as string);
        },
        [_onChange, _freeSoloed, onFreeSoloed]
    );

    return onChange;
};

export default useOnChange;
