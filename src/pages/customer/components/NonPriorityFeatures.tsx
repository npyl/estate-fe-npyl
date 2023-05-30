import { Box, Grid, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectLeaser, selectBuyer } from "src/slices/customer";

const NonPriorityFeatures = () => {

  const leaser = useSelector(selectLeaser);
  const buyer = useSelector(selectBuyer);

  return (
    (leaser || buyer) &&
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
        <Typography variant='h6'>Non-priority Features</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}></Grid>
      </Grid>
    </Paper>
  );
};
export default NonPriorityFeatures;
