import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
  resetState,
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

export default function Form({
  edit = false,
  onUpload,
}: {
  edit?: boolean;
  onUpload?: () => void;
}) {
  const category = useSelector(selectCategory);
  const parentCategory = useSelector(selectParentCategory);

  // enums
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const parentCategoryEnum = enums?.parentCategory;

  const dispatch = useDispatch();

  const handleUpload = () => {
    onUpload && onUpload();
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
                    onClick={handleUpload}
                  >
                    {edit ? "Edit" : "Create"}
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
