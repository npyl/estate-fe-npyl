import { Grid, Paper, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";

const DemandForm: React.FC<any> = (props) => {
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
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Parent Category"
              //   value={covered}
              //   onChange={handleCoveredChange}
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
              label="Furnished"
              //   value={basement}
              //   onChange={handleBasementChange}
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
              label="State"
              //   value={attic}
              //   onChange={handleAtticChange}
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
            <TextField
              fullWidth
              id="outlined-controlled"
              label="Time Frame"
              //   value={balconies}
              //   onChange={handleBalconiesChange}
              //   onKeyPress={handleKeyPress}
              inputProps={{
                style: {
                  height: "8px",
                },
              }}
            />
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
