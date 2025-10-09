import { styled } from "@mui/material/styles";
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

interface EmojiProps extends EmojiPickerListEmojiProps {}

const Emoji: FC<EmojiProps> = ({ emoji: { emoji }, ...props }) => (
    <Button {...props}>{emoji}</Button>
);

export type { EmojiProps };
export default Emoji;
