import EmojiPickerButton from "@/components/EmojiPickerButton";
import { useCallback } from "react";
import { useEditorContext } from "../context";
import { SxProps, Theme } from "@mui/material";
import { TEmoji } from "@/components/EmojiPicker";

const PopoverSx: SxProps<Theme> = {
    zIndex: ({ zIndex }) => zIndex.modal + 2,
};

const Emoji = () => {
    const { editor } = useEditorContext();

    const onEmojiSelect = useCallback(({ emoji }: TEmoji) => {
        // Insert the emoji at the current cursor position
        editor.commands.insertContent(emoji);

        // Focus the editor before inserting content
        editor.commands.focus();
    }, []);

    if (!editor) return null;

    return (
        <EmojiPickerButton
            PickerProps={{ onEmojiSelect }}
            PopoverProps={{ sx: PopoverSx }}
        />
    );
};

export default Emoji;
