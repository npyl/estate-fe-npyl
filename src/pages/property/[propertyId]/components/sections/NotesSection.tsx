import SendIcon from "@mui/icons-material/Send";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Stack, alpha } from "@mui/system";
import { useRouter } from "next/router";
import * as React from "react";
import { useRef, useState } from "react";
import { Note } from "src/components/Note";

import {
  useAddNoteToPropertyWithIdMutation,
  useGetNotesByPropertyIdQuery,
} from "src/services/note";

const NotesPropertySection: React.FC = () => {
  const router = useRouter();
  const { propertyId } = router.query;

  const notes = useGetNotesByPropertyIdQuery(
    parseInt(propertyId as string)
  ).data;

  const [addNote, { isSuccess }] = useAddNoteToPropertyWithIdMutation();

  const commentInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  if (!notes) return null;

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleSendNote = () => {
    // perform POST
    addNote({
      id: parseInt(propertyId as string),
      dataToSend: { content: message },
    });

    isSuccess && setMessage("");
  };
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSendNote();
    }
  };
  return (
    <Paper
      elevation={10}
      sx={{
        overflow: "auto",
        padding: 0,
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
          <Stack spacing={1} sx={{ px: 3, pb: 2 }}>
            {notes.map((note, index) => (
              <Note note={note} key={index} />
            ))}
          </Stack>

          <Grid
            alignItems="center"
            sx={{
              p: (theme) => theme.spacing(0, 3, 3, 3),
            }}
          >
            <InputBase
              fullWidth
              value={message}
              inputRef={commentInputRef}
              placeholder="Write a note..."
              onChange={(event) => handleChangeMessage(event.target.value)}
              onKeyPress={handleKeyPress}
              endAdornment={
                <InputAdornment position="end" sx={{ mr: 1 }}>
                  <IconButton size="small" onClick={handleSendNote}>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NotesPropertySection;
