import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Paper, TextField, MenuItem, List } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { useSelector } from "react-redux";
import { Box, spacing } from "@mui/system";
import FeaturesSection from "./Feautures";

import { useDispatch } from "react-redux";
import {
  selectToPublicTransport,
  selectToSea,
  setToPublicTransport,
  setToSea,
} from "src/slices/property";
import LocationSection from "./Location";
import { property } from "lodash";
const ariaLabel = { "aria-label": "description" };
const DistancesSection: React.FC<any> = (props) => {
  const enums = props.enums as IGlobalProperty;
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

  const toPublicTransport = useSelector(selectToPublicTransport);
  const toSea = useSelector(selectToSea);

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
        <Typography variant="h6">Distances</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Public Transportation"
              value={toPublicTransport}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setToPublicTransport(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
                ),
              }}
              inputProps={{
                shrink: true,
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Sea"
              value={toSea}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setToSea(event.target.value));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">km</InputAdornment>
                ),
              }}
              inputProps={{
                shrink: true,
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
export default DistancesSection;
