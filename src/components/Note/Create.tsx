import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import AddNote from "src/components/AddNote";

import { Note } from "src/components/Note";
import { useProfileQuery } from "src/services/user";
import { INotePOST } from "src/types/note";

interface INoteCreate {
  notes: INotePOST[];
  onAdd: (message: string) => void;
  onRemove: () => void;
}

const NoteCreate = (props: INoteCreate) => {
  const { notes, onAdd, onRemove } = props;
  const profile = useProfileQuery().data; // current user
  if (!profile) return null;

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
          justifyContent: "left",
        }}
      >
        <Typography variant="h6">Notes</Typography>
      </Box>
      <Divider></Divider>
      <Grid container>
        <Grid item xs={12} padding={1}>
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
              onAdd(message);
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default NoteCreate;
