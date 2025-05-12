import Chip from "@mui/material/Chip";
import { FC, RefObject, useEffect, useLayoutEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

interface ChipsProps {
    chips: string[];
    onDelete?: (i: number) => void;
}

const Chips: FC<ChipsProps> = ({ chips, onDelete }) =>
    chips.map((value, i) => (
        <Chip
            key={i}
            label={value}
            onDelete={() => onDelete?.(i)}
            size="small"
        />
    ));

const CONTAINER_CLASSNAME = "free-solo-chips-container";

const useFreeSoloRenderer = (
    localRef: RefObject<HTMLDivElement>,
    freeSoloed: string[],
    onFreeSoloedDelete?: (idx: number) => void
) => {
    const rootRef = useRef<Root | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Find the input element and create container
    useLayoutEffect(() => {
        if (!localRef.current) return;

        const input = localRef.current.querySelector("input");
        if (!input) return;

        const container = localRef.current.querySelector(
            `.${CONTAINER_CLASSNAME}`
        );

        if (!container) {
            const div = document.createElement("div");
            div.className = CONTAINER_CLASSNAME;

            // Insert the container before the input
            input.parentNode?.insertBefore(div, input);
            containerRef.current = div as HTMLDivElement;

            // Create React root for this container
            rootRef.current = createRoot(div);
        } else {
            containerRef.current = container as HTMLDivElement;

            // Create React root for existing container
            if (!rootRef.current) {
                rootRef.current = createRoot(container);
            }
        }

        return () => {
            // INFO: useTimeout forces the unmounting for after render
            setTimeout(() => rootRef.current?.unmount(), 0);
            rootRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!rootRef.current) return;

        rootRef.current.render(
            <Chips chips={freeSoloed} onDelete={onFreeSoloedDelete} />
        );
    }, [freeSoloed, onFreeSoloedDelete]);
};

export default useFreeSoloRenderer;
