import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MuiTextField, {
    TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { FC, useCallback, useRef, KeyboardEvent } from "react";
import { SxProps, Theme } from "@mui/material";
import EmojiPickerButton from "./EmojiPickerButton";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";

const SendButton: FC<IconButtonProps> = (props) => (
    <IconButton {...props}>
        <SendIcon />
    </IconButton>
);

// INFO: important for knowing whether the textfield has content or not!
const PLACEHOLDER_CONTENT = " ";

const StackSx: SxProps<Theme> = {
    "& .SendButton": {
        opacity: 0.3,
        pointerEvents: "none",
    },

    "&:has(input:not(:placeholder-shown))": {
        "& .SendButton": {
            opacity: 1,
            pointerEvents: "all",
        },
    },
};

type TMuiProps = Omit<MuiTextFieldProps<"outlined">, "variant" | "onEmptied">;

interface TextFieldProps extends TMuiProps {
    onSend: (text: string) => void;
    onEmojiClick?: (text: string) => void;
    onEmptied?: () => void;
}

const TextField: FC<TextFieldProps> = ({
    onSend,
    onEmojiClick,
    onEmptied,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = useCallback(() => {
        const v = inputRef.current?.value;
        if (!v) return;
        onSend(v);

        inputRef.current.value = "";
        onEmptied?.();
    }, [onSend, onEmptied]);

    const handleEmojiClick: MouseDownEvent = useCallback(
        (data) => {
            if (!inputRef.current) return;

            const v = inputRef.current.value + data.emoji;

            inputRef.current.value = v;
            onEmojiClick?.(v);
        },
        [onEmojiClick]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const v = inputRef.current?.value;
            if (!v) return;

            if (event.key !== "Enter" || event.shiftKey) return;

            handleSend();
        },
        [handleSend]
    );

    return (
        <Stack
            direction="row"
            spacing={1}
            p={1}
            justifySelf="flex-end"
            sx={StackSx}
        >
            <EmojiPickerButton
                PickerProps={{
                    onEmojiClick: handleEmojiClick,
                }}
            />

            <MuiTextField
                fullWidth
                placeholder={PLACEHOLDER_CONTENT}
                InputProps={{
                    sx: {
                        borderRadius: "16px",
                    },
                }}
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
                {...props}
            />

            <SendButton className="SendButton" onClick={handleSend} />
        </Stack>
    );
};

export default TextField;
