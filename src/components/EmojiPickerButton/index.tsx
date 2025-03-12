import IconButton from "@mui/material/IconButton";
import { FC, useRef } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { EmojiPickerProps } from "./types";
import { PopperProps } from "@mui/material";
const EmojiPickerPopper = dynamic(() => import("./popper"));

interface Props {
    PickerProps?: EmojiPickerProps;
    PopperProps?: Omit<PopperProps, "open">;
}

const EmojiPickerButton: FC<Props> = ({ PickerProps, PopperProps }) => {
    const [isOpen, openPopover, closePopover] = useDialog();
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <IconButton ref={anchorRef} onClick={openPopover}>
                <EmojiEmotionsIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <EmojiPickerPopper
                    anchorEl={anchorRef.current}
                    PickerProps={PickerProps}
                    PopperProps={PopperProps}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default EmojiPickerButton;
