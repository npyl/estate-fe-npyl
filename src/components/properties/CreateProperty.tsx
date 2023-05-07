import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { useAddPropertyMutation } from "src/services/properties";
import { selectAll, selectCode, setCode } from "src/slices/property";
import { IGlobalProperty } from "../../types/global";
import AreasSection from "./Areas";
import BalconiesSection from "./Balconies";
import BasicSection from "./Basic";
import DescriptionSection from "./Description";
import DistancesSection from "./Distances";
import FeaturesSection from "./Features";
import FileSection from "./Files";
import HeatingSection from "./Heating";
import ImageSection from "./Images";
import LocationSection from "./Location";
import ParkingSection from "./Parking";
import PropertyDescriptionSection from "./PropertyDescription";

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
    <Grid container paddingTop={1} spacing={1}>
      <Grid container item paddingTop={0} spacing={1}>
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id='outlined-start-adornment'
                    label='Code*'
                    value={code}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(setCode(event.target.value));
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
                    <InputLabel id='demo-simple-select-label'>
                      Category
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={category}
                      label='Category'
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
        <Grid container item paddingTop={1} spacing={1}>
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
              direction='row'
              spacing={2}
              justifyContent='flex-end'
              alignItems='center'
            >
              <Button
                style={{ left: "400%" }}
                variant='outlined'
                startIcon={<DeleteIcon />}
                onClick={() => handleCancelClick()}
              >
                Cancel
              </Button>

              <Button
                style={{ left: "400%" }}
                variant='contained'
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
  );
}
