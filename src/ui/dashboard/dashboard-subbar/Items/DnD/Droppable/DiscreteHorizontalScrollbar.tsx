import React, { forwardRef } from "react";
import HorizontalScrollbar, {
    HorizontalScrollbarProps,
} from "@/components/HorizontalScrollbar";

interface DiscreetHorizontalScrollbarProps extends HorizontalScrollbarProps {}

/**
 * Do not take up space (due to left/right controls) when no children are provided (specifically, 0 or 1 children, which is just dnd's placeholder)
 */
const DiscreetHorizontalScrollbar = forwardRef<
    HTMLDivElement,
    DiscreetHorizontalScrollbarProps
>((props, ref) => {
    if (React.Children.count(props.children) <= 1) return null;
    return <HorizontalScrollbar ref={ref} {...props} />;
});

DiscreetHorizontalScrollbar.displayName = "DiscreetHorizontalScrollbar";

export type { DiscreetHorizontalScrollbarProps };
export default DiscreetHorizontalScrollbar;
