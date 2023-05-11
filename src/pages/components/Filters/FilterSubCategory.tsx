import {
  Autocomplete,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import {
  selectCategory,
  selectSubCategory,
  setSubCategory,
} from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { useState, useMemo } from "react";
import { useAllPropertyGlobalQuery } from "src/services/global";

export default function SubCategorySelect() {
  const dispatch = useDispatch();
  const selectedCategory: string | undefined = useSelector(selectCategory);
  const subCategory = useSelector(selectSubCategory);

  const { data } = useAllPropertyGlobalQuery();
  const propertyEnums = data?.property;

  const [subCategoryFilterOptions, setSubCategoryFilterOptions] = useState([
    { value: "", label: "All Categories" },
  ]);

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

    setSubCategoryFilterOptions([
      { value: "", label: "All Categories" },
      ...subCategoriesMap[selectedCategory].map((subCategory: string) => {
        return {
          value: subCategory,
          label: subCategory,
        };
      }),
    ]);
  }, [propertyEnums, selectedCategory]);

  if (!data || !propertyEnums) return null;

  return (
    <Autocomplete
      sx={{ width: 180 }}
      id="select-demo"
      options={subCategoryFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) => dispatch(setSubCategory(newValue?.value))}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <FormControlLabel
          control={
            <Radio checked={subCategory === option.value} size="small" />
          }
          label={option.label}
          sx={{ p: 1, width: "100%" }}
          onClick={() => dispatch(setSubCategory(option?.value))}
        />
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
