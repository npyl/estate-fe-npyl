import EmojiPickerButton from "@/components/EmojiPickerButton";
import { useCallback } from "react";
import { useEditorContext } from "../context";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";
import { Z_INDEX } from "../config";

const Emoji = () => {
    const { editor } = useEditorContext();

    const onEmojiClick: MouseDownEvent = useCallback((data) => {
        // Get the emoji character from the data
        const emoji = data.emoji;

        // Insert the emoji at the current cursor position
        editor!.commands.insertContent(emoji);

        // Focus the editor before inserting content
        editor!.commands.focus();
    }, []);

    if (!editor) return null;

    return (
        <EmojiPickerButton
            PickerProps={{
                onEmojiClick,
            }}
            PopperProps={{
                slotProps: {
                    root: {
                        style: {
                            zIndex: Z_INDEX.EMOJI_PICKER,
                        },
                    },
                },
            }}
        />
    );
};

export default Emoji;
