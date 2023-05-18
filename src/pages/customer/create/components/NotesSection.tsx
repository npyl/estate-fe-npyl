import { Stack, Paper, Box, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AddNote from "src/components/AddNote";
import Note from "src/components/Note";
import { addNote, selectNotes } from "src/slices/customer";

const NotesSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  const handleAddNote = (message: string) => {
    dispatch(
      addNote({
        content: "hello",
        creatorId: 1,
        creator: {
          firstName: "TODO:",
          lastName: "TODO:",
        },
        createdAt: "dsdadasda",
      })
    );
  };

  return (
    <Paper
      elevation={10}
      sx={{
        overflow: "auto",
        padding: 0.5,
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Notes</Typography>
      </Box>

      <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
        {notes &&
          notes.length > 0 &&
          notes.map((note, index) => <Note note={note} key={index} />)}
      </Stack>

      <AddNote
        onAdd={(message) => {
          handleAddNote(message);
        }}
      />
    </Paper>
  );
};
export default NotesSection;
