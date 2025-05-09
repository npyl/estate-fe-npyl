import Chip from "@mui/material/Chip";
import { RefObject, useCallback, useLayoutEffect, useRef } from "react";

const renderFreeSoloChip =
    (onDelete: (i: number) => void) => (s: string, i: number) => (
        <Chip label={s} onDelete={() => onDelete(i)} />
    );

const useFreeSoloRenderer = (
    localRef: RefObject<HTMLDivElement>,
    freeSoloed: string[],
    onFreeSoloed?: (v: string[]) => void
) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useLayoutEffect(() => {
        if (!localRef.current) return;

        const input = localRef.current.querySelector("input");
        if (!input) return;

        inputRef.current = input;
    }, []);

    const onDeleteFreeSolo = useCallback(
        (idx: number) => {
            const filtered = freeSoloed.filter((_, i) => i !== idx);
            onFreeSoloed?.(filtered);
        },
        [freeSoloed, onFreeSoloed]
    );

    return null;
};

export default useFreeSoloRenderer;
