import { FC } from "react";
import MuiDialog, { DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import Slide, { SlideProps } from "@mui/material/Slide";
import useResponsive from "@/hooks/useResponsive";
import { SxProps, Theme } from "@mui/material";

const getDialogSx = (isDrawer: boolean): SxProps<Theme> => ({
    "& .MuiDialog-container": {
        // INFO: this is what sticks the dialog into bottom making it look like a drawer
        alignItems: isDrawer ? "flex-end" : "center",

        "& .MuiPaper-root": {
            width: isDrawer ? 1 : undefined,
            margin: isDrawer ? 0 : undefined,
            borderRadius: isDrawer ? 0 : undefined,
        },
    },
});

// INFO: we do not cover the case of MuiDialog's internal Transition type (a.k.a. <Fade />),
// but in case of <Slide />, the only excessive prop is `direction` which is ignored.
const transitionProps: Omit<SlideProps, "children"> = {
    direction: "up",
    timeout: 100,
};

interface ResponsiveDialogProps
    extends Omit<MuiDialogProps, "TransitionComponent"> {}

/**
 * Dialog component that changes the Transition below Sm breakpoint so that it behaves like a Drawer
 * (Direction is only bottom-up currently)
 */
const ResponsiveDialog: FC<ResponsiveDialogProps> = ({ sx, ...props }) => {
    const isDrawer = useResponsive("down", "sm");

    // Ignore for drawer mode
    const TransitionComponent = isDrawer ? Slide : undefined;

    return (
        <MuiDialog
            TransitionComponent={TransitionComponent}
            TransitionProps={transitionProps}
            sx={{ ...(getDialogSx(isDrawer) as any), ...sx }}
            {...props}
        />
    );
};

export type { ResponsiveDialogProps };
export default ResponsiveDialog;
