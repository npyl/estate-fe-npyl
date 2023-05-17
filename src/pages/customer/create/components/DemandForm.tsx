import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";

import { useAllPropertyGlobalQuery } from "src/services/global";

const DemandForm: React.FC<any> = (props) => {
  const enums = useAllPropertyGlobalQuery().data;
  const propertyEnums = enums?.property;
  const stateEnum = propertyEnums?.state;
  const detailsEnum = propertyEnums?.details;
  const parentCategoryEnum = propertyEnums?.parentCategory;
  const furnishingEnum = detailsEnum?.furnished;

  const timeframeEnum = ["1", "2"];

  if (
    !enums ||
    !propertyEnums ||
    !stateEnum ||
    !detailsEnum ||
    !furnishingEnum ||
    !parentCategoryEnum ||
    !timeframeEnum
  )
    return null;

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
        <Typography variant="h6">Demand Form</Typography>
      </Box>

      <Grid item xs={12} padding={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Autocomplete based on Property Code"
              //   value={plot}
              //   onChange={handlePlotChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Parent Category</InputLabel>
              <Select
                // value={parentCategory}
                label="Parent Category"
                onChange={(e) => {
                  // dispatch(setParentCategory(e.target.value));
                }}
              >
                {parentCategoryEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Furnishing</InputLabel>
              <Select
                // value={parentCategory}
                label="Furnishing"
                onChange={(e) => {
                  // dispatch(setParentCategory(e.target.value));
                }}
              >
                {furnishingEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                // value={parentCategory}
                label="State"
                onChange={(e) => {
                  // dispatch(setParentCategory(e.target.value));
                }}
              >
                {stateEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Labels"
              //   value={garden}
              //   onChange={handleGardenChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Time Frame</InputLabel>
              <Select
                // value={parentCategory}
                label="Time Frame"
                onChange={(e) => {
                  // dispatch(setParentCategory(e.target.value));
                }}
              >
                {timeframeEnum.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>{" "}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Bedrooms</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
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
                  label="max"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Bathrooms</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
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
                  label="max"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Covered</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
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
                  label="max"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Plot</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
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
                  label="max"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Price</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
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
                  label="max"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Floor</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
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
                  label="max"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Year of Construction</Typography>
            <Grid container direction={"row"} spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-controlled"
                  label="min"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
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
                  label="max"
                  //   value={storeroom}
                  //   onChange={handleStoreroomChange}
                  //   onKeyPress={handleKeyPress}
                  inputProps={{
                    style: {
                      height: "8px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default DemandForm;
