import { Box, Stack, StackProps } from "@mui/material";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import sleep from "@/utils/sleep";

interface ScrollContainerRef {
    scroll: VoidFunction;
}

const ScrollContainer = forwardRef<ScrollContainerRef, StackProps>(
    ({ children, ...props }, ref) => {
        const localRef = useRef<HTMLDivElement>(null);
        const endBoxRef = useRef<HTMLDivElement>(null);

        const scroll = useCallback(async () => {
            if (!localRef.current) return;

            // IMPORTANT: wait for rerenders to finish
            await sleep(100);

            const hasScrollbar =
                localRef.current.scrollHeight > localRef.current.clientHeight;

            if (!hasScrollbar) return;

            // Save current body scroll position
            const bodyScrollPos = window.scrollY;

            // Scroll to the end box
            endBoxRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });

            window.scrollTo({
                top: bodyScrollPos,
                behavior: "auto", // Use 'auto' to avoid another smooth scroll
            });
        }, []);

        useImperativeHandle(ref, () => ({ scroll }), []);

        return (
            <Stack ref={localRef} pr={2} mr={-2} {...props}>
                {children}
                <Box ref={endBoxRef} />
            </Stack>
        );
    }
);

export type { ScrollContainerRef };
export default ScrollContainer;
