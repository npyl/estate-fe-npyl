import EmojiPicker from "@/components/EmojiPicker";
import Popper from "@mui/material/Popper";
import { FC } from "react";
import { EmojiPickerProps } from "./types";
import { ClickAwayListener } from "@mui/material";

interface Props {
    anchorEl: HTMLElement;
    PickerProps?: EmojiPickerProps;
    onClose: VoidFunction;
}

const EmojiPickerPopper: FC<Props> = ({ anchorEl, PickerProps, onClose }) => (
    <ClickAwayListener onClickAway={onClose}>
        <Popper open anchorEl={anchorEl} placement="top">
            <EmojiPicker
                open
                lazyLoadEmojis
                searchDisabled
                previewConfig={{ showPreview: false }}
                {...PickerProps}
            />
        </Popper>
    </ClickAwayListener>
);

export default EmojiPickerPopper;
