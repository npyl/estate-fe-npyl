import Stack, { StackProps } from "@mui/material/Stack";
import { FC, forwardRef, useCallback, useRef } from "react";
import useDialog from "@/hooks/useDialog";
import Controls, { CONTROLS_CLASSNAME } from "./Controls";
import ScrollContainer, { ContainerRef } from "./ScrollContainer";

const useScroll = () => {
    const scrollRef = useRef<ContainerRef>(null);
    const scrollLeft = useCallback(() => scrollRef.current?.scrollLeft(), []);
    const scrollRight = useCallback(() => scrollRef.current?.scrollRight(), []);
    return [scrollRef, scrollLeft, scrollRight] as const;
};

const useControls = () => {
    const [isMounted, mount] = useDialog();
    const controlsRef = useRef<HTMLDivElement | null>(null);

    const onOverflowChange = useCallback((b: boolean) => {
        if (!controlsRef.current) return;
        controlsRef.current.style.visibility = b ? "visible" : "hidden";
    }, []);

    const onRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;
        controlsRef.current = node;
        mount();
    }, []);

    return [isMounted, { onRef, onOverflowChange }] as const;
};

interface AwaitedContentProps extends Omit<StackProps, "ref"> {}

const ContentWithWait: FC<AwaitedContentProps> = (props) => {
    const [scrollRef, scrollLeft, scrollRight] = useScroll();
    const [isMounted, { onRef, onOverflowChange }] = useControls();

    return (
        <>
            {isMounted ? (
                <ScrollContainer
                    ref={scrollRef}
                    onOverflowChange={onOverflowChange}
                    {...props}
                />
            ) : null}

            <Controls
                ref={onRef}
                onScrollLeft={scrollLeft}
                onScrollRight={scrollRight}
            />
        </>
    );
};

interface HorizontalScrollbarProps extends AwaitedContentProps {
    containerProps?: Omit<StackProps, "children">;
}

const HorizontalScrollbar = forwardRef<
    HTMLDivElement,
    HorizontalScrollbarProps
>(({ containerProps, ...props }, ref) => (
    <Stack
        ref={ref}
        direction="row"
        alignItems="center"
        overflow="auto hidden"
        gap={0.5}
        {...containerProps}
    >
        <ContentWithWait {...props} />
    </Stack>
));

HorizontalScrollbar.displayName = "HorizontalScrollbar";

export { CONTROLS_CLASSNAME };
export type { HorizontalScrollbarProps };
export default HorizontalScrollbar;
