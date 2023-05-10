import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { IGlobalProperty } from "../../types/global";
import { useAddPropertyMutation } from "src/services/properties";
import { useDispatch, useSelector } from "react-redux";
import { resetState, selectAll } from "src/slices/property";
import { Grid, Paper, TextField, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  selectCategory,
  setCategory,
  selectParentCategory,
  setParentCategory,
} from "src/slices/property";
import ResidentialFormSection from "./ResidentialForm";
import LandFormSection from "./LandForm";
import CommercialFormSection from "./CommercialForm";
import OtherFormSection from "./OtherForm";

import { List, Card, CardContent, CardHeader } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { selectDescription, setDescription } from "src/slices/property";
import Editor from "../editor/Editor";

// @mui
import { Container } from "@mui/material";
// routes
import { PATH_PAGE } from "../extra/routes/paths";
// components

import Markdown from "../markdown";
import CustomBreadcrumbs from "../custom-breadcrumbs";

export default function SimpleAccordion(props: { enums: IGlobalProperty }) {
  const { data } = useAllPropertyGlobalQuery();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const property: IGlobalProperty = data?.property as IGlobalProperty;
  const router = useRouter();
  const body = useSelector(selectAll);
  const [create, { isSuccess }] = useAddPropertyMutation();

  //////
  const [quillFull, setQuillFull] = useState("");

  const category = useSelector(selectCategory);
  const parentCategory = useSelector(selectParentCategory);
  const dispatch = useDispatch();

  const enums = props.enums as IGlobalProperty;

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

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const [selectedForm, setSelectedForm] = useState<string>("");

  return (
    <>
      <Grid paddingTop={1} paddingRight={0} spacing={1}>
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Parent Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={parentCategory}
                        label="Parent Category"
                        onChange={handleChange}
                      >
                        <MenuItem
                          value={10}
                          onClick={() => setSelectedForm("residential")}
                        >
                          Residential
                        </MenuItem>
                        <MenuItem
                          value={20}
                          onClick={() => setSelectedForm("commercial")}
                        >
                          Commercial
                        </MenuItem>
                        <MenuItem
                          value={30}
                          onClick={() => setSelectedForm("land")}
                        >
                          Land
                        </MenuItem>
                        <MenuItem
                          value={40}
                          onClick={() => setSelectedForm("other")}
                        >
                          Other
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="Category*"
                      value={category}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setCategory(event.target.value));
                      }}
                    ></TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {selectedForm !== "" && (
          <Grid
            container
            paddingTop={1}
            paddingLeft={1}
            paddingRight={0}
            spacing={1}
          >
            {selectedForm === "residential" && (
              <ResidentialFormSection enums={property} />
            )}
            {selectedForm === "land" && <LandFormSection enums={property} />}
            {selectedForm === "commercial" && (
              <CommercialFormSection enums={property} />
            )}
            {selectedForm === "other" && <OtherFormSection enums={property} />}

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
                  onClick={() => dispatch(resetState())}
                >
                  Clear
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
