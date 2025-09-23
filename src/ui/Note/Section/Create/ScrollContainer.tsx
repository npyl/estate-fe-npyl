import Stack, { StackProps } from "@mui/material/Stack";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { getNoteId } from "@/ui/Note/Note";

const CUSHION_OFFSET = 10;

interface ScrollContainerRef {
    scroll: (id: number) => void;
}

const ScrollContainer = forwardRef<ScrollContainerRef, StackProps>(
    ({ children, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);

        const scroll = useCallback(async (id: number) => {
            if (!containerRef.current) return;

            const el = document.getElementById(getNoteId(id));
            if (!el) return;

            // INFO: calculate the element's position relative to the scroll container
            const containerRect = containerRef.current.getBoundingClientRect();
            const elementRect = el.getBoundingClientRect();
            const top =
                elementRect.top -
                containerRect.top +
                containerRef.current.scrollTop -
                CUSHION_OFFSET;

            containerRef.current.scrollTo({
                top,
                behavior: "smooth",
            });
        }, []);

        useImperativeHandle(ref, () => ({ scroll }), [scroll]);

        return (
            <Stack ref={containerRef} pr={2} mr={-2} {...props}>
                {children}
            </Stack>
        );
    }
);

export type { ScrollContainerRef };
export default ScrollContainer;
