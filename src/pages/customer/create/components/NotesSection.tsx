import { Box, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNote from "src/components/AddNote";
import Note from "src/components/Note";
import { addNote, selectNotes } from "src/slices/customer";

import { useProfileQuery } from "src/services/user";

const NotesSection: React.FC<any> = (props) => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const profile = useProfileQuery().data; // current user

  if (!profile) return null;

  const handleAddNote = (message: string) => {
    dispatch(
      addNote({
        content: message,
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
        <Typography variant='h6'>Notes</Typography>
      </Box>

      <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
        {notes &&
          notes.length > 0 &&
          notes.map((note, index) => {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              fractionalSecondDigits: 1,
            });

            return (
              <Note
                note={{
                  content: note.content,
                  creator: profile,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }}
                key={index}
              />
            );
          })}
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
