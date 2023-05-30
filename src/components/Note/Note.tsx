import { Grid, Stack, Paper, Typography, IconButton } from "@mui/material";
import { CustomAvatar } from "../custom-avatar";

import { INote } from "src/types/note";

import Iconify from "src/components/iconify/Iconify";

import { useDeleteWithIdMutation } from "src/services/note";

interface NoteProps {
  note: INote;
}

const Note: React.FC<NoteProps> = (props) => {
  const { note } = props;
  const [deleteNote, { isSuccess }] = useDeleteWithIdMutation();
  const createdAt = new Date(note.createdAt);
  const formattedDate = `${createdAt.getHours()}:${createdAt.getMinutes()} ${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;

  const username = note.creator.firstName + " " + note.creator.lastName;

  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar alt={username} src={note.creator.profilePhoto || ""} />

      <Paper
        sx={{
          p: 1,
          flexGrow: 2,
          bgcolor: "#fce9a4",
        }}
      >
        <div style={{ width: "100%" }}>
          <Stack
            justifyContent="space-between"
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            sx={{ mb: 1 }}
          >
            <Typography variant="subtitle2">{username}</Typography>

            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {formattedDate}
            </Typography>
          </Stack>
        </div>

        <Stack direction={"row"}>
          <Typography variant="body2" sx={{ color: "text.secondary" }} flex={1}>
            {note.content.toString()}
          </Typography>
          <Grid item>
            <IconButton
              onClick={() => {
                note.id && deleteNote(note.id);
                console.log("Button clicked!");
              }}
            >
              <Iconify icon={"eva:trash-2-outline"} />
            </IconButton>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Note;
