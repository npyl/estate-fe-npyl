import Stack, { StackProps } from "@mui/material/Stack";
import {
    forwardRef,
    ReactNode,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";
import useUpdateLayoutEffect from "@/hooks/useUpdateLayoutEffect";

const scrollAmount = 200;

const useOverflow = (children: ReactNode, onChange: (b: boolean) => void) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const checkOverflow = useCallback(() => {
        if (!scrollRef.current) return false;
        return scrollRef.current.scrollWidth > scrollRef.current.clientWidth;
    }, []);

    const onOverflowChange = useCallback(() => onChange(checkOverflow()), []);

    // ---------------------------------------------------------------------------------

    // onResize
    useLayoutEffect(() => {
        window.addEventListener("resize", onOverflowChange);
        return () => {
            window.removeEventListener("resize", onOverflowChange);
        };
    }, []);

    // onChildrenUpdate
    useUpdateLayoutEffect(onOverflowChange, [children]);

    // onMount
    const onRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;
        scrollRef.current = node;
        onOverflowChange();
    }, []);

    return [scrollRef, { onRef }] as const;
};

interface ScrollContainerProps extends Omit<StackProps, "onResize"> {
    onOverflowChange: (b: boolean) => void;
}

interface ContainerRef {
    scrollLeft: VoidFunction;
    scrollRight: VoidFunction;
}

const ScrollContainer = forwardRef<ContainerRef, ScrollContainerProps>(
    ({ onOverflowChange, children, ...props }, ref) => {
        const [scrollRef, { onRef }] = useOverflow(children, onOverflowChange);

        const scrollLeft = useCallback(() => {
            scrollRef.current?.scrollBy({
                left: -scrollAmount,
                behavior: "smooth",
            });
        }, []);

        const scrollRight = useCallback(() => {
            scrollRef.current?.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }, []);

        useImperativeHandle(
            ref,
            () => ({
                scrollLeft,
                scrollRight,
            }),
            []
        );

        return (
            <Stack
                ref={onRef}
                direction="row"
                overflow="hidden hidden"
                alignItems="center"
                {...props}
            >
                {children}
            </Stack>
        );
    }
);

export type { ContainerRef };
export default ScrollContainer;
