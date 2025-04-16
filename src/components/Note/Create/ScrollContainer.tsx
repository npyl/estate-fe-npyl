import Stack, { StackProps } from "@mui/material/Stack";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import sleep from "@/utils/sleep";

interface ScrollContainerRef {
    scroll: VoidFunction;
}

const ScrollContainer = forwardRef<ScrollContainerRef, StackProps>(
    ({ children, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);

        const scroll = useCallback(async () => {
            if (!containerRef.current) return;

            // Wait for rerenders to finish
            await sleep(100);

            // Direct DOM manipulation approach - this should work in any browser
            const container = containerRef.current;

            // Check if we need to scroll
            if (container.scrollHeight <= container.clientHeight) return;

            container.scrollTop = container.scrollHeight;
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
