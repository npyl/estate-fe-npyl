import * as React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Paper, TextField, MenuItem, List } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { IGlobalProperty } from "src/types/global";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { selectDescription, setDescription } from "src/slices/property";

const DescriptionSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const dispatch = useDispatch();
  const description = useSelector(selectDescription);

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
        <Typography variant="h6">Description</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={23}
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setDescription(event.target.value));
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end"></InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DescriptionSection;
