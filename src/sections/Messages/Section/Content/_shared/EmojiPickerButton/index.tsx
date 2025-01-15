import IconButton from "@mui/material/IconButton";
import { useRef } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
const EmojiPickerPopper = dynamic(() => import("./popper"));

const EmojiPickerButton = () => {
    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                <EmojiEmotionsIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <EmojiPickerPopper anchorEl={anchorRef.current} />
            ) : null}
        </>
    );
};

export default EmojiPickerButton;
