import EmojiPicker from "@/components/EmojiPicker";
import Popper from "@mui/material/Popper";
import { FC } from "react";
import { EmojiPickerProps } from "./types";

interface Props {
    anchorEl: HTMLElement;
    PickerProps?: EmojiPickerProps;
}

const EmojiPickerPopper: FC<Props> = ({ anchorEl, PickerProps }) => (
    <Popper open anchorEl={anchorEl} placement="top">
        <EmojiPicker
            open
            lazyLoadEmojis
            searchDisabled
            previewConfig={{ showPreview: false }}
            {...PickerProps}
        />
    </Popper>
);

export default EmojiPickerPopper;
