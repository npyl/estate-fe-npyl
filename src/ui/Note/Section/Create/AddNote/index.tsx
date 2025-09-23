import SendIcon from "@mui/icons-material/Send";
import {
    IconButton,
    InputAdornment,
    InputBase,
    SxProps,
    Theme,
    alpha,
} from "@mui/material";
import { FC, KeyboardEvent, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import useOnAdd, { Config } from "./useOnAdd";

const InputSx: SxProps<Theme> = {
    pl: 1.5,
    height: 40,
    borderRadius: 1,
    border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
};

interface AddNoteProps extends Config {}

const AddNote: FC<AddNoteProps> = (config) => {
    const { t } = useTranslation();

    const onAdd = useOnAdd(config);

    const commentInputRef = useRef<HTMLInputElement>(null);
    const onKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission
                e.stopPropagation(); // Stop event propagation

                if (!commentInputRef.current) return;

                const message = commentInputRef.current.value || "";
                if (!message.trim()) return;

                onAdd(message);

                commentInputRef.current.value = ""; // Clear input after adding
            }
        },
        [onAdd]
    );

    const handleOnClick = useCallback(() => {
        if (!commentInputRef.current) return;

        const message = commentInputRef.current?.value || "";
        if (!message.trim()) return;

        onAdd(message);

        commentInputRef.current.value = "";
    }, [onAdd]);

    return (
        <InputBase
            fullWidth
            inputRef={commentInputRef}
            placeholder={t<string>("Write a note...")}
            onKeyDown={onKeyDown}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton size="small" onClick={handleOnClick}>
                        <SendIcon />
                    </IconButton>
                </InputAdornment>
            }
            sx={InputSx}
        />
    );
};

export default AddNote;
