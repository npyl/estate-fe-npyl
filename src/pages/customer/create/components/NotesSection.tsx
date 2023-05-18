import { Paper, Box, Typography } from "@mui/material";
import * as React from "react";

import AddNote from "src/components/AddNote";

const NotesSection: React.FC<any> = (props) => {
  const handleAddNote = (message: string) => {};

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

      <AddNote
        onAdd={(message) => {
          handleAddNote(message);
        }}
      />
    </Paper>
  );
};
export default NotesSection;
