import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
  selectCategory,
  selectParentCategory,
  setCategory,
  setParentCategory,
} from "src/slices/property";

import { IGlobalProperty } from "src/types/global";

import { Send as SendIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface IFormProps {
  performUpload?: () => void;
}

export default function Form({ performUpload }: IFormProps) {
  const dispatch = useDispatch();

  // enums
  const { data } = useAllGlobalsQuery();
  const enums: IGlobalProperty = data?.property as IGlobalProperty;
  const parentCategoryEnum = enums?.parentCategory;

  const category = useSelector(selectCategory);
  const parentCategory = useSelector(selectParentCategory);

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
  const { t } = useTranslation();
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
              {t("Parent Category")}
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
            label={t("Category")}
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

      <Grid
        padding={2}
        container
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        <Grid item>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={performUpload}
          >
            {t("Create")}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
