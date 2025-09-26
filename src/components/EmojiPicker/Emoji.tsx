import { PopperProps } from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { EmojiPickerListEmojiProps } from "frimousse";
import { FC } from "react";

const Button = styled("button")(({ theme }) => ({
    width: "fit-content",
    height: "fit-content",

    fontSize: "25px",

    backgroundColor: "transparent",
    ":hover": {
        backgroundColor: theme.palette.action.hover,
    },

    border: 0,
    borderRadius: theme.spacing(1),

    cursor: "pointer",
}));

// INFO: prevent tooltip from consuming scrolling events
const TooltipPopperProps: Partial<PopperProps> = {
    sx: { pointerEvents: "none" },
};

const Emoji: FC<EmojiPickerListEmojiProps> = ({
    emoji: { emoji, isActive, label },
    ...props
}) => (
    <Tooltip title={label} PopperProps={TooltipPopperProps}>
        <Button {...props}>{emoji}</Button>
    </Tooltip>
);

export default Emoji;
