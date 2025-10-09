import { FC } from "react";
import { Popover, PopoverProps } from "@mui/material";
import Content from "./Content";
import { EmojiPickerProps } from "@/components/EmojiPicker";

interface EmojiPickerPopoverProps {
    anchorEl: HTMLElement;
    PickerProps?: EmojiPickerProps;
    PopoverProps?: Omit<PopoverProps, "open" | "onClose">;
    onClose: VoidFunction;
}

const EmojiPickerPopover: FC<EmojiPickerPopoverProps> = ({
    anchorEl,
    PickerProps,
    PopoverProps,
    onClose,
}) => (
    <Popover
        open
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...PopoverProps}
    >
        <Content {...PickerProps} />
    </Popover>
);

export type { EmojiPickerPopoverProps };
export default EmojiPickerPopover;
