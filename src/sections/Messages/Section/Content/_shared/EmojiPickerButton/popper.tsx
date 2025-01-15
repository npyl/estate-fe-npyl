import EmojiPicker from "@/components/EmojiPicker";
import Popper from "@mui/material/Popper";
import { FC } from "react";

interface Props {
    anchorEl: HTMLElement;
}

const EmojiPickerPopper: FC<Props> = ({ anchorEl }) => {
    return (
        <Popper open anchorEl={anchorEl} placement="top">
            <EmojiPicker
                open
                lazyLoadEmojis
                searchDisabled
                previewConfig={{ showPreview: false }}
            />
        </Popper>
    );
};

export default EmojiPickerPopper;
