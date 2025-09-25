import IconButton from "@mui/material/IconButton";
import { FC, useRef } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { EmojiPickerPopoverProps } from "./Popover";
const EmojiPickerPopover = dynamic(() => import("./Popover"));

interface EmojiPickerButtonProps
    extends Omit<EmojiPickerPopoverProps, "anchorEl" | "onClose"> {}

const EmojiPickerButton: FC<EmojiPickerButtonProps> = (props) => {
    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                <EmojiEmotionsIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <EmojiPickerPopover
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    {...props}
                />
            ) : null}
        </>
    );
};

export default EmojiPickerButton;
