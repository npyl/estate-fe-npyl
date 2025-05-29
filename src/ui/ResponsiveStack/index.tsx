import Stack, { StackProps } from "@mui/material/Stack";
import React, {
    ReactNode,
    useCallback,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { FC, useRef } from "react";
import Item from "./Item";
import NotFittingButton from "./NotFittingButton";

// -------------------------------------------------------------------------------

interface IFullChild {
    el: HTMLDivElement;
    react: ReactNode;
}

interface ResponsiveStackProps extends StackProps {}

const ResponsiveStack: FC<ResponsiveStackProps> = ({ children, ...props }) => {
    const observerRef = useRef<ResizeObserver | null>(null);
    const [overflowing, setOverflowing] = useState<ReactNode[]>([]);

    // ---------------------------------------------------------------------

    const childrenRef = useRef<IFullChild[]>([]);
    const onChildRef = useCallback(
        (react: ReactNode) => (el: HTMLDivElement) => {
            if (!el) return;
            childrenRef.current?.push({ el, react });
        },
        []
    );
    const Children = useMemo(
        () =>
            React.Children.map(children, (c, i) => (
                <Item onRef={onChildRef(c)} key={i} c={c} />
            )),
        [children]
    );

    // ---------------------------------------------------------------------

    const calculateOverflow = useCallback((containerEl: HTMLDivElement) => {
        if (childrenRef.current.length === 0) return;

        const containerRect = containerEl.getBoundingClientRect();
        const containerRight = containerRect.right;
        const containerBottom = containerRect.bottom;

        let overflowing: ReactNode[] = [];

        childrenRef.current.forEach(({ el, react }) => {
            if (!el) return;

            const childRect = el.getBoundingClientRect();

            // Check if element overflows horizontally or vertically
            const overflowsHorizontally = childRect.right > containerRight;
            const overflowsVertically = childRect.bottom > containerBottom;

            if (overflowsHorizontally || overflowsVertically) {
                overflowing.push(react);
            }
        });

        // TODO: make this set somehow without state...
        if (overflowing.length > 0) setOverflowing(overflowing);
    }, []);

    const onContainerRef = useCallback(
        (containerEl: HTMLDivElement) => {
            if (!containerEl) return;

            // Calculate overflow initially
            calculateOverflow(containerEl);

            // Set up ResizeObserver to recalculate on container size changes
            observerRef.current = new ResizeObserver(() =>
                calculateOverflow(containerEl)
            );

            observerRef.current.observe(containerEl);
        },
        [calculateOverflow]
    );

    useLayoutEffect(() => {
        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    // Recalculate when children change
    useLayoutEffect(() => {
        // Reset children refs when children change
        childrenRef.current = [];
    }, [children]);

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Stack
                ref={onContainerRef}
                direction="row"
                spacing={1}
                alignItems="center"
                overflow="hidden"
                flexWrap="wrap"
                {...props}
            >
                {Children}
            </Stack>

            <NotFittingButton overflowing={overflowing} />
        </Stack>
    );
};

export type { ResponsiveStackProps };
export default ResponsiveStack;
