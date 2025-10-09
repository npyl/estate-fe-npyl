import Paper from "@mui/material/Paper";
import { FC, ReactNode } from "react";
import { SxProps, Theme } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";
import { SearchCategory } from "../../types";
import useConsumeScroll from "./useConsumeScroll";

const getPaperSx = (
    historyMode: boolean,
    width: number | string,
    top: number | string,
    left: number | string,
    transform?: string
): SxProps<Theme> => ({
    // positioning
    position: "fixed",
    zIndex: ({ zIndex }) => zIndex.appBar + 1,
    top,
    left,
    transform,

    // dimentions
    width: { xs: "calc(100% - 16px)", sm: "90vw", md: width },
    minHeight: "100px",
    height: historyMode ? "fit-content" : "90vh",

    // styling
    border: "1px solid",
    borderColor: getBorderColor2,
    borderRadius: "25px",
    boxShadow: 15,

    // overflows
    overflowY: "auto",
});

interface PopoverProps {
    anchorEl: HTMLElement;
    children: ReactNode;
    searchCategory: SearchCategory;
    historyMode: boolean;
}

const Popover: FC<PopoverProps> = ({
    searchCategory,
    historyMode,
    children,
    anchorEl,
}) => {
    useConsumeScroll();

    // INFO: when in history mode or in single search mode we can show a smaller paper; otherwise show a large
    const shouldInheritWidth = historyMode || searchCategory !== "all";

    const width = shouldInheritWidth
        ? anchorEl.getBoundingClientRect().width
        : "70vw";

    const top =
        anchorEl.getBoundingClientRect().top +
        anchorEl.getBoundingClientRect().height;
    const left = shouldInheritWidth
        ? anchorEl.getBoundingClientRect().left
        : "50%";
    const transform = shouldInheritWidth ? undefined : "translateX(-50%)";

    return (
        <Paper sx={getPaperSx(historyMode, width, top, left, transform)}>
            {children}
        </Paper>
    );
};

export type { PopoverProps };
export default Popover;
