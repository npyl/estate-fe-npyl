import { Grid, Paper, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const NonPriorityFeatures: React.FC<any> = (props) => {
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
        <Typography variant="h6">Non-priority Features</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}></Grid>
      </Grid>
    </Paper>
  );
};
export default NonPriorityFeatures;
