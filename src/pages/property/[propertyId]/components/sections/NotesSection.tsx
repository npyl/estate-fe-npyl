import {
  Stack,
  Paper,
  Typography,
  Box,
  InputBase,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { alpha } from "@mui/material/styles";

import React from "react";
import { useRef, useState } from "react";

import { CustomAvatar } from "src/components/custom-avatar";
import SendIcon from "@mui/icons-material/Send";
import { IProperties } from "src/types/properties";

import {
  useGetNotesByPropertyIdQuery,
  useAddNoteToPropertyWithIdMutation,
} from "src/services/note";

interface NotesSectionProps {
  data: IProperties;
}

interface NoteProps {
  note: {
    author: {
      name: string;
      profileImage: string;
    };
    createdAt: string;
    message: string;
  };
}

const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <Stack direction="row" spacing={2}>
      <CustomAvatar alt={note.author.name} src={note.author.profileImage} />

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
          <Typography variant="subtitle2">{note.author.name}</Typography>

          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {note.createdAt}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {note.message}
        </Typography>
      </Paper>
    </Stack>
  );
};

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
    addNote({ id: data.id, dataToSend: { content: message } });
  };

  const _notesFormat = notes.map((note, index) => {
    return {
      author: {
        name: "Nick",
        profileImage: "",
      },
      createdAt: "12312312",
      message: note.content,
    };
  });

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
        {_notesFormat.map((note, index) => (
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
        {/* <CustomAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          name={user?.displayName}
        /> */}

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

        {/* <input type="file" ref={fileInputRef} style={{ display: "none" }} /> */}
      </Stack>
    </>
  );
};

export default NotesSection;
