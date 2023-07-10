import { Checkbox, Grid, MenuItem, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Box } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import { selectVideo, setVideo } from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";

const VideoLinkSection: React.FC<any> = (props) => {
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;
  const dispatch = useDispatch();

  const video = useSelector(selectVideo);

  return (
    <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Video Link</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Video Link"
              value={video}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setVideo(event.target.value));
              }}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VideoLinkSection;
