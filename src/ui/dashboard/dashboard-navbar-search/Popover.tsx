import useAvailableHeight from "@/hooks/useAvailableHeight";
import MuiPopover, {
    PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";
import { FC, useRef } from "react";

interface PopoverProps extends Omit<MuiPopoverProps, "slotProps"> {}

const Popover: FC<PopoverProps> = (props) => {
    const paperRef = useRef<HTMLDivElement>(null);
    useAvailableHeight(paperRef);

    return (
        <MuiPopover
            slotProps={{
                paper: {
                    ref: paperRef,
                    sx: {
                        width: "500px",
                    },
                },
            }}
            {...props}
        />
    );
};

export type { PopoverProps };
export default Popover;
