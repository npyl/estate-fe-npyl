import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import {
  selectCategory,
  selectSubCategories,
  setSubCategories,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { useState, useMemo } from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";

export default function SubCategorySelect() {
  const dispatch = useDispatch();
  const selectedCategory: string | undefined = useSelector(selectCategory);
  const subCategories = useSelector(selectSubCategories);

  const { data } = useAllPropertyGlobalQuery();
  const propertyEnums = data?.property;

  interface IFilterOption {
    label: string;
    checked: boolean;
  }

  interface IFilterOptions {
    [key: string]: IFilterOption;
  }

  const initialOptions: IFilterOptions = {
    "": { label: "All Categories", checked: false },
  };

  const [subCategoryFilterOptions, setSubCategoryFilterOptions] =
    useState<IFilterOptions>(initialOptions);

  useMemo(() => {
    if (!selectedCategory || !propertyEnums || selectedCategory === "")
      return null;

    const subCategoriesMap: {
      [key: string]: string[];
    } = {
      Residential: propertyEnums.residentialCategory,
      Commercial: propertyEnums.commercialCategory,
      Land: propertyEnums.landCategory,
      Other: propertyEnums.otherCategory,
    };

    setSubCategoryFilterOptions({
      "": { label: "All Categories", checked: false },
      ...Object.fromEntries(
        subCategoriesMap[selectedCategory].map((subCategory: string) => [
          subCategory,
          { label: subCategory, checked: false },
        ])
      ),
    });
  }, [propertyEnums, selectedCategory]);

  if (!data || !propertyEnums) return null;

  return (
    <Autocomplete
      sx={{ width: 180 }}
      options={Object.keys(subCategoryFilterOptions)}
      autoHighlight
      clearIcon={false}
      onChange={(e, option) => {
        if (!option) return;

        // change checked status
        const checked = subCategoryFilterOptions[option].checked;
        subCategoryFilterOptions[option].checked = !checked; // toggle

        dispatch(setSubCategories([...subCategories, option]));
      }}
      getOptionLabel={(option) => subCategoryFilterOptions[option].label}
      renderOption={(props, option) => (
        <Box {...props} component="li">
          <Checkbox checked={subCategoryFilterOptions[option].checked} />
          {subCategoryFilterOptions[option].label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Υπο-κατηγορία"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
