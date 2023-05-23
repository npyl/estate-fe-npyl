import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllPropertyGlobalQuery } from "src/services/global";
import { useAddPropertyMutation } from "src/services/properties";
import {
  resetState,
  selectAll,
  selectCategory,
  selectParentCategory,
  setCategory,
  setParentCategory,
} from "src/slices/property";

import { IGlobalProperty } from "src/types/global";

import CommercialFormSection from "./CommercialForm";
import LandFormSection from "./LandForm";
import OtherFormSection from "./OtherForm";
import ResidentialFormSection from "./ResidentialForm";

export default function Form({ edit = false }: { edit?: boolean }) {
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [fileData, setFileData] = useState<(File | string)[]>([]);
  const router = useRouter();
  const body = useSelector(selectAll);
  const [create, { isSuccess }] = useAddPropertyMutation();

  const category = useSelector(selectCategory);
  const parentCategory = useSelector(selectParentCategory);

  // enums
  const { data } = useAllPropertyGlobalQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const parentCategoryEnum = enums?.parentCategory;

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

  if (!enums || !parentCategoryEnum) return null;

  const subCategoriesMap: {
    [key: string]: string[];
  } = {
    Residential: enums.residentialCategory,
    Commercial: enums.commercialCategory,
    Land: enums.landCategory,
    Other: enums.otherCategory,
  };

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
              <Typography variant="h4">Create Property</Typography>
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
                        onChange={(e) => {
                          dispatch(setParentCategory(e.target.value));
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
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="Category"
                      value={category}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        dispatch(setCategory(event.target.value));
                      }}
                      inputProps={{
                        style: {
                          height: "8px",
                        },
                      }}
                      size="small"
                    >
                      {subCategoriesMap[parentCategory] &&
                        subCategoriesMap[parentCategory].map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {parentCategory !== "" && (
          <Grid
            container
            paddingTop={1}
            paddingLeft={1}
            paddingRight={0}
            spacing={1}
          >
            {parentCategory === "Residential" && <ResidentialFormSection />}
            {parentCategory === "Land" && <LandFormSection />}
            {parentCategory === "Commercial" && <CommercialFormSection />}
            {parentCategory === "Other" && <OtherFormSection />}

            <Grid item xs={12} padding={2}>
              <Grid
                container
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(resetState())}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => performUpload()}
                  >
                    Create Property
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
