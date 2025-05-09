import Chip from "@mui/material/Chip";
import {
    FC,
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";
import { createRoot } from "react-dom/client";

interface ChipsProps {
    chips: string[];
    onDelete: (i: number) => void;
}

const Chips: FC<ChipsProps> = ({ chips, onDelete }) =>
    chips.map((value, i) => (
        <Chip key={i} label={value} onDelete={() => onDelete(i)} size="small" />
    ));

const CONTAINER_CLASSNAME = "free-solo-chips-container";

const useFreeSoloRenderer = (
    localRef: RefObject<HTMLDivElement>,
    freeSoloed: string[],
    onFreeSoloed?: (v: string[]) => void
) => {
    const rootRef = useRef<any>(null);
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

        // Cleanup function
        return () => {
            if (rootRef.current) {
                rootRef.current.unmount();
                rootRef.current = null;
            }
        };
    }, []);

    const onDeleteFreeSolo = useCallback(
        (idx: number) => {
            const filtered = freeSoloed.filter((_, i) => i !== idx);
            onFreeSoloed?.(filtered);
        },
        [freeSoloed, onFreeSoloed]
    );

    useEffect(() => {
        if (!rootRef.current) return;

        rootRef.current.render(
            <Chips chips={freeSoloed} onDelete={onDeleteFreeSolo} />
        );
    }, [freeSoloed, onDeleteFreeSolo]);
};

export default useFreeSoloRenderer;
