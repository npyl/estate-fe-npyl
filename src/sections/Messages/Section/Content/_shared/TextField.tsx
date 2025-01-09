import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MuiTextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { FC, useCallback, useRef } from "react";
import { SxProps, Theme } from "@mui/material";

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

interface TextFieldProps {
    onSend: (text: string) => void;
}

const TextField: FC<TextFieldProps> = ({ onSend }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = useCallback(() => {
        const v = inputRef.current?.value;
        if (!v) return;
        onSend(v);
    }, [onSend]);

    return (
        <Stack
            direction="row"
            spacing={1}
            p={1}
            justifySelf="flex-end"
            sx={StackSx}
        >
            <MuiTextField
                fullWidth
                placeholder={PLACEHOLDER_CONTENT}
                InputProps={{
                    sx: {
                        borderRadius: "16px",
                    },
                }}
                inputRef={inputRef}
            />

            <SendButton className="SendButton" onClick={handleSend} />
        </Stack>
    );
};

export default TextField;
