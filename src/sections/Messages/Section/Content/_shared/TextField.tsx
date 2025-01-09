import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MuiTextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { FC, useCallback, useRef } from "react";

const SendButton: FC<IconButtonProps> = (props) => (
    <IconButton {...props}>
        <SendIcon />
    </IconButton>
);

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
        <Stack direction="row" spacing={1} p={1} justifySelf="flex-end">
            <MuiTextField
                fullWidth
                InputProps={{ sx: { borderRadius: "16px" } }}
                inputRef={inputRef}
            />

            <SendButton onClick={handleSend} />
        </Stack>
    );
};

export default TextField;
