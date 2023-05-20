import {
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Stack, alpha } from "@mui/system";
import * as React from "react";
import { useRouter } from "next/router";
import Note from "src/components/Note";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  useAddNoteToCustomerWithIdMutation,
  useGetNotesByCustomerIdQuery,
} from "src/services/note";
import { ICustomer } from "src/types/customer";

const NotesCustomerSection: React.FC = () => {
  const router = useRouter();
  const { customerId } = router.query;

  // // const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  // // const notes = data?.notes;
  // const { data } = props;
  // const notes = useGetNotesByCustomerIdQuery(data.id).data;

  // const commentInputRef = React.useRef<HTMLInputElement>(null);
  // const [message, setMessage] = React.useState("");
  // const [addNote, { isSuccess }] = useAddNoteToCustomerWithIdMutation();
  // // const [create, { isSuccess }] = useAddNoteToCustomerWithIdMutation();

  // if (!notes || notes.length == 0) return null;

  // const handleChangeMessage = (value: string) => {
  //   setMessage(value);
  // };

  // const handleSendNote = () => {
  //   // perform POST
  //   addNote({
  //     id: data.id,
  //     dataToSend: { creatorId: 1, content: message },
  //   });

  //   isSuccess && setMessage("");
  // };
  // const handleKeyPress = (event: { key: string }) => {
  //   if (event.key === "Enter") {
  //     handleSendNote();
  //   }
  // };

  const notes = useGetNotesByCustomerIdQuery(
    parseInt(customerId as string)
  ).data;

  const [addNote, { isSuccess }] = useAddNoteToCustomerWithIdMutation();

  const commentInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  if (!notes || notes.length == 0) return null;

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleSendNote = () => {
    // perform POST
    addNote({
      id: parseInt(customerId as string),
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
      <Grid container>
        <Stack spacing={1} sx={{ px: 3, pb: 2 }}>
          {notes.map((note, index) => (
            <Note note={note} key={index} />
          ))}
        </Stack>

        <Grid
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
    </Paper>
  );
};

export default NotesCustomerSection;
