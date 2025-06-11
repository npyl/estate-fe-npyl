import Stack, { StackProps } from "@mui/material/Stack";
import {
    FC,
    forwardRef,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";
import RoundIconButton from "./RoundIconButton";
import { ChevronRight } from "@/assets/icons/chevron-right";

// ----------------------------------------------------------------------------------

const scrollAmount = 200;

const useOverflow = (
    scrollRef: RefObject<HTMLDivElement>,
    children: ReactNode,
    onChange: (b: boolean) => void
) => {
    const checkOverflow = useCallback(() => {
        if (!scrollRef.current) return false;
        return scrollRef.current.scrollWidth > scrollRef.current.clientWidth;
    }, []);

    const onOverflowChange = useCallback(() => onChange(checkOverflow()), []);

    useEffect(onOverflowChange, [children]);

    useLayoutEffect(() => {
        window.addEventListener("resize", onOverflowChange);
        return () => {
            window.removeEventListener("resize", onOverflowChange);
        };
    }, []);
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
        const scrollRef = useRef<HTMLDivElement>(null);

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

        useOverflow(scrollRef, children, onOverflowChange);

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
                ref={scrollRef}
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

// ----------------------------------------------------------------------------------

const CONTROLS_CLASSNAME = "PPHorizontalScrollbar-Controls";

interface ControlsProps extends StackProps {
    onScrollLeft: VoidFunction;
    onScrollRight: VoidFunction;
}

const Controls = forwardRef<HTMLDivElement, ControlsProps>(
    ({ onScrollLeft, onScrollRight, ...props }, ref) => (
        <Stack
            ref={ref}
            className={CONTROLS_CLASSNAME}
            direction="row"
            alignItems="center"
            width="fit-content"
            visibility="hidden"
            mt={0.5}
            {...props}
        >
            <RoundIconButton size="small" onClick={onScrollLeft}>
                <ChevronRight sx={{ transform: "rotate(180deg)" }} />
            </RoundIconButton>
            <RoundIconButton size="small" onClick={onScrollRight}>
                <ChevronRight />
            </RoundIconButton>
        </Stack>
    )
);

// ----------------------------------------------------------------------------------

interface HorizontalScrollbarProps extends Omit<StackProps, "ref"> {
    containerProps?: StackProps;
}

const HorizontalScrollbar = forwardRef<
    HTMLDivElement,
    HorizontalScrollbarProps
>(({ containerProps, ...props }, ref) => {
    const scrollRef = useRef<ContainerRef>(null);
    const scrollLeft = useCallback(() => scrollRef.current?.scrollLeft(), []);
    const scrollRight = useCallback(() => scrollRef.current?.scrollRight(), []);

    const controlsRef = useRef<HTMLDivElement>(null);

    const onOverflowChange = useCallback((b: boolean) => {
        if (!controlsRef.current) return;
        controlsRef.current.style.visibility = b ? "visible" : "hidden";
    }, []);

    return (
        <Stack
            ref={ref}
            direction="row"
            alignItems="center"
            overflow="hidden hidden"
            gap={0.5}
            {...containerProps}
        >
            <ScrollContainer
                ref={scrollRef}
                onOverflowChange={onOverflowChange}
                {...props}
            />

            <Controls
                ref={controlsRef}
                onScrollLeft={scrollLeft}
                onScrollRight={scrollRight}
            />
        </Stack>
    );
});

HorizontalScrollbar.displayName = "HorizontalScrollbar";

export { CONTROLS_CLASSNAME };
export type { HorizontalScrollbarProps };
export default HorizontalScrollbar;
