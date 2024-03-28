import {
    Stack,
    Paper as MuiPaper,
    Typography,
    IconButton,
    Avatar,
} from "@mui/material";
import { CustomAvatar } from "../custom-avatar";
import { styled } from "@mui/material/styles";
import { INote } from "src/types/note";

import Iconify from "src/components/iconify/Iconify";

const Paper = styled(MuiPaper)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? "#fce9a4"
            : theme.palette.neutral?.[700],
}));

interface NoteProps {
    note: INote;
    onRemove: () => void;
}

const Note: React.FC<NoteProps> = (props) => {
    const { note, onRemove } = props;

    const createdAt = new Date(note.createdAt);

    const formattedDate = `${createdAt.getHours()}:${createdAt.getMinutes()} ${createdAt.getDate()}/${
        createdAt.getMonth() + 1
    }/${createdAt.getFullYear()}`;

    const username = note.creator.firstName + " " + note.creator.lastName;

    return (
        <Stack direction="row" spacing={1}>
            {note.creator.firstName && note.creator.lastName ? (
                <Avatar>
                    {note.creator.firstName[0]}
                    {note.creator.lastName[0]}
                </Avatar>
            ) : (
                <CustomAvatar
                    alt={username}
                    src={note.creator.profilePhoto || ""}
                />
            )}

            <Paper
                sx={{
                    p: 1.5,
                    flexGrow: 1,
                }}
            >
                <Stack
                    justifyContent="space-between"
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center" }}
                >
                    <Typography variant="subtitle2">{username}</Typography>
                    <Typography
                        variant="caption"
                        sx={{ color: "text.disabled" }}
                    >
                        {formattedDate}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="text.secondary">
                        {note.content.toString()}
                    </Typography>
                    <IconButton onClick={onRemove}>
                        <Iconify icon="eva:trash-2-outline" fontSize="20px" />
                    </IconButton>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Note;
