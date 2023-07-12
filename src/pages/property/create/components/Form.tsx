import { Grid, Paper, TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
  selectCategory,
  selectParentCategory,
  setCategory,
  setParentCategory,
} from "src/slices/property";
import { IGlobalProperty } from "src/types/global";

export default function Form({
  performUpload,
}: {
  edit?: boolean;
  performUpload?: () => void;
}) {
  const dispatch = useDispatch();

  // enums
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const parentCategoryEnum = enums?.parentCategory;

  const category = useSelector(selectCategory);
  const parentCategory = useSelector(selectParentCategory);

  useEffect(() => {
    if (!parentCategory || !category) return;

    // create our property draft
    performUpload && performUpload();
  }, [parentCategory, category]);

  if (!enums || !parentCategoryEnum || parentCategoryEnum.length === 0)
    return null;

  const subCategoriesMap: {
    [key: string]: string[];
  } = {
    Residential: enums.residentialCategory,
    Commercial: enums.commercialCategory,
    Land: enums.landCategory,
    Other: enums.otherCategory,
  };

  return (
    <Grid container spacing={1} paddingLeft={2} paddingTop={3}>
      <Grid
        component={Paper}
        padding={"8px 16px 16px 10px"}
        container
        spacing={1}
      >
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
            disabled={parentCategory === ""}
            fullWidth
            id="outlined-select-currency"
            select
            label="Category"
            value={category}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(setCategory(event.target.value));
            }}
          >
            {subCategoriesMap[parentCategory] ? (
              subCategoriesMap[parentCategory].map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem></MenuItem>
            )}
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}
