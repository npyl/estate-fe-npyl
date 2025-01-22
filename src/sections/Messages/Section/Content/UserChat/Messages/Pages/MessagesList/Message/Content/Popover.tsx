import MuiPopover, {
    PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface PopoverProps extends Omit<MuiPopoverProps, "open"> {
    currentUser: boolean;
    createdAt: string;
}

const Popover: FC<PopoverProps> = ({ currentUser, createdAt, ...props }) => {
    const horizontalOrigin = currentUser ? "left" : "right";
    const horizontalTransform = currentUser ? "right" : "left";

    return (
        <MuiPopover
            open
            anchorOrigin={{ horizontal: horizontalOrigin, vertical: "center" }}
            transformOrigin={{
                horizontal: horizontalTransform,
                vertical: "center",
            }}
            {...props}
        >
            <Typography>{new Date(createdAt).toLocaleDateString()}</Typography>
        </MuiPopover>
    );
};

export default Popover;
