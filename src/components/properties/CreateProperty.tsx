import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Box, ThemeProvider, margin } from "@mui/system";
import BasicSection from "./Basic";
import FeaturesSection from "./Feautures";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import { useAddPropertyMutation } from "src/services/properties";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "src/slices/property";
import DescriptionSection from "./Description";
import LocationSection from "./Location";
import AreasSection from "./Areas";
import {
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  createMuiTheme,
} from "@mui/material";
import HeatingSection from "./Heating";
import ParkingSection from "./Parking";
import BalconiesSection from "./Balconies";
import DistancesSection from "./Distances";
import PropertyDescriptionSection from "./PropertyDescription";
import ImageSection from "./Images";
import { useRouter } from "next/router";
import FileSection from "./Files";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Refresh } from "src/icons/refresh";
import { selectCode, setCode } from "src/slices/property";

export default function SimpleAccordion() {
  const { data } = useAllPropertyGlobalQuery();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const property: IGlobalProperty = data?.property as IGlobalProperty;
  const router = useRouter();
  const body = useSelector(selectAll);

  const [create, { isSuccess }] = useAddPropertyMutation();
  const code = useSelector(selectCode);
  const dispatch = useDispatch();

  const performUpload = () => {
    const blob = new Blob([JSON.stringify(body)], {
      type: "application/json",
    });
    let dataToSend = new FormData();
    console.log(files);
    dataToSend.append(
      "propertyImage ",
      files[0] || new File([""], "", { type: "null" })
    );
    for (let i = 1; i < files.length; i++) {
      dataToSend.append(
        "propertyGallery ",
        files[i] || new File([""], "", { type: "null" })
      );
    }
    dataToSend.append("propertyForm ", blob);
    console.log(fileData);
    dataToSend.append(
      "propertyFile ",
      files[0] || new File([""], "", { type: "null" })
    );
    for (let i = 1; i < fileData.length; i++) {
      dataToSend.append(
        "propertyGalleryFiles ",
        files[i] || new File([""], "", { type: "null" })
      );
    }
    dataToSend.append("propertyForm ", blob);

    // perform POST
    create(dataToSend);
    console.log("hi");
    isSuccess && router.push("/");
  };
  const [category, setCategory] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const [showPropertyDetails, setShowPropertyDetails] = useState(false);

  const handleMenuItemClick = () => {
    setShowPropertyDetails(true);
  };
  const handleCancelClick = () => {
    window.location.reload();
  };

  return (
    <>
      <Grid paddingTop={1} paddingRight={1} spacing={1}>
        <Grid container paddingTop={0} paddingRight={1} spacing={1}>
          <Grid item xs={12} spacing={1} order={"row"}>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50px",
                paddingBottom: "9px",
              }}
            >
              <Typography>
                <h2> Create Property</h2>
              </Typography>
            </Grid>
            <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
              <Grid item xs={12} padding={1}>
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-start-adornment"
                      label="Code*"
                      value={code}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setCode(event.target.value));
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      inputProps={{
                        shrink: true,
                        style: {
                          height: "23px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleChange}
                      >
                        <MenuItem value={10} onClick={handleMenuItemClick}>
                          Property
                        </MenuItem>
                        <MenuItem value={20}>Business property</MenuItem>
                        <MenuItem value={30}>Lan</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {showPropertyDetails && (
          <Grid container paddingTop={1} paddingRight={1} spacing={1}>
            <Grid item xs={6} spacing={1} order={"row"}>
              <Stack spacing={1}>
                <BasicSection enums={property} />

                <PropertyDescriptionSection enums={property} />

                <AreasSection enums={property} />
                <DistancesSection enums={property} />
                <FileSection
                  fileData={fileData}
                  setFileData={setFileData}
                  enums={property}
                />
              </Stack>
            </Grid>
            <Grid item xs={6} spacing={1}>
              <Stack spacing={1}>
                <ImageSection
                  files={files}
                  setFiles={setFiles}
                  enums={property}
                />
                <LocationSection enums={property} />
                <HeatingSection enums={property} />

                <ParkingSection enums={property} />

                <BalconiesSection enums={property} />

                <DescriptionSection enums={property} />
              </Stack>
            </Grid>

            {/* <DetailsSection enums={property} /> */}
            <Grid item xs={12}>
              <FeaturesSection enums={property} />
            </Grid>

            <Box padding={2}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Button
                  style={{ left: "400%" }}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleCancelClick()}
                >
                  Cancel
                </Button>

                <Button
                  style={{ left: "400%" }}
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={() => performUpload()}
                >
                  Upload
                </Button>
              </Stack>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
