import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

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
import CommercialFormSection from "./Forms/CommercialForm";
import LandFormSection from "./Forms/LandForm";
import OtherFormSection from "./Forms/OtherForm";
import ResidentialFormSection from "./Forms/ResidentialForm";
import NotesSection from "./NotesSection";

import { resetState as resetLabelsState } from "src/slices/labels";
import { resetState as resetPropertyState } from "src/slices/property";
import { resetState as resetPropertyFilesState } from "src/slices/property/files";
import { resetState as resetPropertyNotesState } from "src/slices/notes";

export default function Form({
  edit = false,
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

  const handleClick = () => {
    performUpload && performUpload();
  };

  const resetState = () => {
    dispatch(resetPropertyState());
    dispatch(resetPropertyFilesState());
    dispatch(resetPropertyNotesState());
    dispatch(resetLabelsState());
  };

  useEffect(() => {
    if (!edit) {
      resetState();
    }
  }, [edit]);

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

      {parentCategory !== "" && (
        <Grid container mt={0} spacing={1}>
          {parentCategory === "Residential" && <ResidentialFormSection />}
          {parentCategory === "Land" && <LandFormSection />}
          {parentCategory === "Commercial" && <CommercialFormSection />}
          {parentCategory === "Other" && <OtherFormSection />}

          <Grid
            padding={2}
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => resetState()}
              >
                Clear
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleClick}
              >
                {edit ? "Edit" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
