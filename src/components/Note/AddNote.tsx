import SendIcon from "@mui/icons-material/Send";
import { Grid, IconButton, InputAdornment, InputBase } from "@mui/material";
import { alpha } from "@mui/material";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface AddNoteProps {
    onAdd(message: string): void;
}

const AddNote = (props: AddNoteProps) => {
    const { t } = useTranslation();

    const commentInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");

    const { onAdd } = props;

    const handleChangeMessage = (value: string) => {
        setMessage(value);
    };
    const handleKeyPress = (event: { key: string }) => {
        if (event.key === "Enter") {
            onAdd(message);
            setMessage("");
        }
    };
    const handleOnClick = () => {
        onAdd(message);
        setMessage("");
    };

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            sx={{
                p: (theme) => theme.spacing(0, 3, 3, 3),
            }}
        >
            <InputBase
                fullWidth
                value={message}
                inputRef={commentInputRef}
                placeholder={t("Write a note...").toString()}
                onChange={(event) => handleChangeMessage(event.target.value)}
                onKeyPress={handleKeyPress}
                endAdornment={
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                        <IconButton size="small" onClick={handleOnClick}>
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                }
                sx={{
                    pl: 1.5,
                    height: 40,
                    borderRadius: 1,
                    border: (theme) =>
                        `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
                }}
            />
        </Grid>
    );
};

export default AddNote;
