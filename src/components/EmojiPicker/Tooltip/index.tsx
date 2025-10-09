import { SxProps, Theme } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

const PopoverSx: SxProps<Theme> = {
    // INFO: prevent tooltip from consuming scrolling events
    pointerEvents: "none",

    zIndex: ({ zIndex }) => zIndex.tooltip,
};

interface TooltipData {
    anchorEl: HTMLElement;
    label: string;
}

interface TooltipRef {
    show: (d: TooltipData) => void;
    close: VoidFunction;
}

interface TooltipProps {}

const Tooltip = forwardRef<TooltipRef, TooltipProps>((_, ref) => {
    const [data, setData] = useState<TooltipData>();
    const close = useCallback(() => setData(undefined), []);

    useImperativeHandle(ref, () => ({ show: setData, close }), []);

    if (!data) return null;

    const { anchorEl, label } = data;

    return (
        <Popover
            open
            anchorEl={anchorEl}
            onClose={close}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            sx={PopoverSx}
        >
            <Typography p={1} noWrap>
                {label}
            </Typography>
        </Popover>
    );
});

export type { TooltipRef, TooltipData };
export default Tooltip;
