import Paper from "@mui/material/Paper";
import MuiPopper, { PopperProps as MuiPopperProps } from "@mui/material/Popper";
import { FC, ReactNode } from "react";
import stopPropagation from "@/utils/stopPropagation";
import { Fade } from "@mui/material";
import { getBorderColor2 } from "@/theme/borderColor";

interface PopoverProps extends Omit<MuiPopperProps, "anchorEl" | "children"> {
    anchorEl: HTMLElement;
    children: ReactNode;
    historyMode: boolean;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({
    historyMode,
    onClose,
    children,
    ...props
}) => {
    const width = historyMode
        ? (props.anchorEl?.getBoundingClientRect().width ?? "90vw")
        : "90vw";

    return (
        <MuiPopper
            transition
            sx={{
                zIndex: ({ zIndex }) => zIndex.appBar + 1,
            }}
            onClick={stopPropagation}
            {...props}
        >
            {({ TransitionProps }) => (
                <Fade appear {...TransitionProps} timeout={100}>
                    <Paper
                        sx={{
                            width,
                            minHeight: "100px",
                            height: historyMode ? "fit-content" : "90vh",
                            border: "1px solid",
                            borderColor: getBorderColor2,
                            borderRadius: "25px",
                            boxShadow: 15,
                        }}
                    >
                        {children}
                    </Paper>
                </Fade>
            )}
        </MuiPopper>
    );
};

export type { PopoverProps };
export default Popover;
