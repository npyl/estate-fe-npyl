import Chip from "@mui/material/Chip";
import { useCallback } from "react";
import { ObjectWithId } from "./types";
import {
    AutocompleteOwnerState,
    AutocompleteRenderGetTagProps,
} from "@mui/material/Autocomplete";

const renderFreeSoloChip =
    (onDelete: (i: number) => void) => (s: string, i: number) => (
        <Chip label={s} onDelete={() => onDelete(i)} />
    );

type TRenderTags<
    T extends ObjectWithId,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false,
> = (
    value: T[],
    getTagProps: AutocompleteRenderGetTagProps,
    ownerState: AutocompleteOwnerState<
        T,
        Multiple,
        DisableClearable,
        FreeSolo,
        "div"
    >
) => React.ReactNode;

const useTagRenderer = <
    T extends ObjectWithId,
    Multiple extends boolean = false,
    DisableClearable extends boolean = false,
    FreeSolo extends boolean = false,
>(
    _renderTags:
        | TRenderTags<T, Multiple, DisableClearable, FreeSolo>
        | undefined,
    freeSoloed: string[],
    onFreeSoloed: ((v: string[]) => void) | undefined
) => {
    const onDeleteFreeSolo = useCallback(
        (idx: number) => {
            const filtered = freeSoloed.filter((_, i) => i !== idx);
            onFreeSoloed?.(filtered);
        },
        [freeSoloed, onFreeSoloed]
    );
    const renderTags: TRenderTags<T, Multiple, DisableClearable, FreeSolo> =
        useCallback(
            (...args) => {
                // The result from the original renderTags or an empty array if it's not provided
                const _0 = renderTags?.(...args) ?? [];

                // Convert _0 to an array if it's not already one
                const _0Array = Array.isArray(_0) ? _0 : [_0];

                // The free solo chips
                const _1 = freeSoloed.map(renderFreeSoloChip(onDeleteFreeSolo));

                // Combine both arrays
                return [..._0Array, ..._1];
            },
            [_renderTags, freeSoloed, onDeleteFreeSolo]
        );

    return renderTags;
};

export default useTagRenderer;
