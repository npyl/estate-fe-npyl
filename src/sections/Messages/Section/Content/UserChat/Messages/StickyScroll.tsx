import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";

/**
 * INFO: this component serves as a scroll container
 * with the (vertical) scrollbar pinned at the scroll end by-default
 * (e.g. on first load) but with the ability to scroll normally (=> pinning is not permanent)
 */
const StackSx: SxProps<Theme> = {
    scrollBehavior: "smooth",
    overscrollBehavior: "contain",
    scrollSnapType: "y proximity",
    "&::after": {
        content: '""',
        display: "block",
        height: 0,
        scrollSnapAlign: "end",
    },
};

const StickyScroll: FC<StackProps> = ({ sx, ...props }) => (
    <Stack overflow="hidden auto" sx={{ ...StackSx, ...sx }} {...props} />
);

export default StickyScroll;
