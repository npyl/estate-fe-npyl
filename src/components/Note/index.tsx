import { Stack, Paper, Typography } from "@mui/material";
import { CustomAvatar } from "../custom-avatar";

import { INote } from "src/types/note";

interface NoteProps {
  note: INote;
}

const Note: React.FC<NoteProps> = (props) => {
  const { note } = props;

  const username = note.creator.firstName + " " + note.creator.lastName;

  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar alt={username} src={note.creator.profilePhoto || ""} />

      <Paper
        sx={{
          p: 1.5,
          flexGrow: 1,
          bgcolor: "neutral.300",
        }}
      >
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2">{username}</Typography>

          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {note.createdAt.toString()}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {note.content.toString()}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default Note;
