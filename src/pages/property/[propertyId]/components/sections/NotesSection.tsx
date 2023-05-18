import {
  Stack,
  Typography,
  Box,
  InputBase,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { alpha } from "@mui/material/styles";

import React from "react";

import { useRef, useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { IProperties } from "src/types/properties";

import Note from "src/components/Note";

import {
  useGetNotesByPropertyIdQuery,
  useAddNoteToPropertyWithIdMutation,
} from "src/services/note";

interface NotesSectionProps {
  data: IProperties;
}

const NotesSection: React.FC<NotesSectionProps> = (props) => {
  const { data } = props;
  const notes = useGetNotesByPropertyIdQuery(data.id).data;
  const [addNote, { isSuccess }] = useAddNoteToPropertyWithIdMutation();

  const commentInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  if (!notes || notes.length == 0) return null;

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleSendNote = () => {
    // perform POST
    addNote({
      id: data.id,
      dataToSend: { creatorId: 1, content: message },
    });

    isSuccess && setMessage("");
  };

  return (
    <>
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
        {notes.map((note, index) => (
          <Note note={note} key={index} />
        ))}
      </Stack>

      <Stack
        spacing={2}
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
          placeholder="Write a comment…"
          onChange={(event) => handleChangeMessage(event.target.value)}
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
      </Stack>
    </>
  );
};

export default NotesSection;
