import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete";
import { FC, ReactNode, useCallback } from "react";
import Chip from "@mui/material/Chip";

interface ChipsProps {
    chips: string[];
    onDelete?: (i: number) => void;
}

const Chips: FC<ChipsProps> = ({ chips, onDelete }) =>
    chips.map((value, i) => (
        <Chip key={value} label={value} onDelete={() => onDelete?.(i)} />
    ));

const useRenderInput = (
    _renderInput: (p: AutocompleteRenderInputParams) => ReactNode,
    freeSoloed: string[],
    onFreeSoloedDelete?: (i: number) => void
) =>
    useCallback(
        (params: AutocompleteRenderInputParams) =>
            _renderInput({
                ...params,
                InputProps: {
                    ...params.InputProps,
                    startAdornment: (
                        <>
                            {params.InputProps.startAdornment}

                            <Chips
                                chips={freeSoloed}
                                onDelete={onFreeSoloedDelete}
                            />
                        </>
                    ),
                },
            }),
        [_renderInput, freeSoloed, onFreeSoloedDelete]
    );

export default useRenderInput;
