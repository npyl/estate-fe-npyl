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

import SendIcon from "@mui/icons-material/Send";
import {
  useAddNoteToCustomerWithIdMutation,
  useGetNotesByCustomerIdQuery,
} from "src/services/note";

const NotesCustomerSection: React.FC = (props) => {
  const router = useRouter();
  const { customerId } = router.query;
  // const { data } = useGetCustomerByIdQuery(parseInt(customerId as string)); // basic details
  // const notes = data?.notes;

  const notes = useGetNotesByCustomerIdQuery(
    parseInt(customerId as string)
  ).data;

  const commentInputRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState("");

  const [create, { isSuccess }] = useAddNoteToCustomerWithIdMutation();

  if (!notes || notes.length == 0) return null;

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleSendNote = () => {
    create({
      id: parseInt(customerId as string),
      dataToSend: {
        content: message,
        creatorId: 1,
      },
    });
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
        <Stack spacing={1} sx={{ px: 1, pb: 4 }}>
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
      </Grid>
    </Paper>
  );
};

export default NotesCustomerSection;
