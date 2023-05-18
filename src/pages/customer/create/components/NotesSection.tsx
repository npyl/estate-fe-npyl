import {
  Grid,
  Paper,
  Stack,
  InputBase,
  IconButton,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { alpha } from "@mui/material/styles";

import * as React from "react";

import { useRef, useState } from "react";

const NotesSection: React.FC<any> = (props) => {
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  const handleAddNote = () => {};

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

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
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
                  <IconButton size="small" onClick={handleAddNote}>
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
      </Grid>
    </Paper>
  );
};
export default NotesSection;
