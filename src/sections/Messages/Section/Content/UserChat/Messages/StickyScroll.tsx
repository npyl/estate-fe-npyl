import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";

const keyframes = {
    "@keyframes enableInteraction": {
        from: {
            touchAction: "none",
            pointerEvents: "none",
        },
        to: {
            touchAction: "auto",
            pointerEvents: "auto",
        },
    },
};

/**
 * INFO: this component serves as a scroll container
 * with the (vertical) scrollbar pinned at the scroll end by-default
 * (e.g. on first load) but with the ability to scroll normally (=> pinning is not permanent)
 */
const StackSx: SxProps<Theme> = {
    //
    // Initial scroll position (100%)
    //
    scrollBehavior: "smooth",
    overscrollBehavior: "contain",
    scrollSnapType: "y proximity",
    "&::after": {
        content: '""',
        display: "block",
        height: 0,
        scrollSnapAlign: "end",
    },

    //
    // Snapping Logic (stop snapping when the user attempts to scroll)
    //
    touchAction: "none",
    pointerEvents: "none",
    animation: "enableInteraction 0s 0.5s forwards",
    "&:hover, &:active, &:has(:hover), &:has(:active)": {
        scrollSnapType: "none",

        "&, & *": {
            pointerEvents: "auto !important",
            touchAction: "auto !important",
        },
    },
    ...keyframes,
};
const StickyScroll: FC<StackProps> = ({ sx, ...props }) => (
    <Stack overflow="hidden auto" sx={{ ...StackSx, ...sx }} {...props} />
);

export default StickyScroll;
