import Paper from "@mui/material/Paper";
import MuiPopper, { PopperProps as MuiPopperProps } from "@mui/material/Popper";
import { FC, ReactNode } from "react";
import stopPropagation from "@/utils/stopPropagation";
import { Fade, SxProps, Theme } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";
import { SearchCategory } from "./types";
import { INPUT_WIDTH_LG } from "./Input/constants";

const getPaperSx = (
    historyMode: boolean,
    width: number | string
): SxProps<Theme> => ({
    width,
    minHeight: "100px",
    height: historyMode ? "fit-content" : "90vh",
    border: "1px solid",
    borderColor: getBorderColor2,
    borderRadius: "25px",
    boxShadow: 15,
    overflowY: "auto",
});

interface PopoverProps
    extends Omit<MuiPopperProps, "sx" | "anchorEl" | "children"> {
    anchorEl: HTMLElement;
    children: ReactNode;
    searchCategory: SearchCategory;
    historyMode: boolean;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({
    searchCategory,
    historyMode,
    onClose,
    children,
    ...props
}) => {
    // INFO: when in history mode or in single search mode we can show a smaller paper; otherwise show a large
    const shouldInheritWidth = historyMode || searchCategory !== "all";

    const width = shouldInheritWidth ? INPUT_WIDTH_LG : "70vw";

    return (
        <MuiPopper
            transition
            sx={{ zIndex: ({ zIndex }) => zIndex.appBar + 1 }}
            onClick={stopPropagation}
            {...props}
        >
            {({ TransitionProps }) => (
                <Fade appear {...TransitionProps} timeout={100}>
                    <Paper sx={getPaperSx(historyMode, width)}>
                        {children}
                    </Paper>
                </Fade>
            )}
        </MuiPopper>
    );
};

export type { PopoverProps };
export default Popover;
