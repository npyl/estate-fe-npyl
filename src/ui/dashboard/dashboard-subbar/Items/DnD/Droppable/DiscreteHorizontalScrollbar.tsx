import React, { forwardRef } from "react";
import HorizontalScrollbar, {
    CONTROLS_CLASSNAME,
    HorizontalScrollbarProps,
} from "@/components/HorizontalScrollbar";

const getContainerProps = (isDiscreet: boolean) => ({
    sx: {
        [`.${CONTROLS_CLASSNAME}`]: {
            display: isDiscreet ? "none" : "flex",
        },
    },
});

interface DiscreetHorizontalScrollbarProps
    extends Omit<HorizontalScrollbarProps, "containerProps"> {}

/**
 * Do not take up space (due to left/right controls) when no children are provided (specifically, 0 or 1 children, which is just dnd's placeholder)
 */
const DiscreetHorizontalScrollbar = forwardRef<
    HTMLDivElement,
    DiscreetHorizontalScrollbarProps
>((props, ref) => {
    const isDiscreet = React.Children.count(props.children) <= 1;

    return (
        <HorizontalScrollbar
            ref={ref}
            containerProps={getContainerProps(isDiscreet)}
            {...props}
        />
    );
});

DiscreetHorizontalScrollbar.displayName = "DiscreetHorizontalScrollbar";

export type { DiscreetHorizontalScrollbarProps };
export default DiscreetHorizontalScrollbar;
