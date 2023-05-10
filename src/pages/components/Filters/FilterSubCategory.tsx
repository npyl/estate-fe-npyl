import Autocomplete from "@mui/material/Autocomplete";
import { Box, TextField } from "@mui/material";
import { selectCategory, setSubCategory } from "src/slices/filters";
import { useDispatch, useSelector } from "src/store";
import { IGlobalProperty } from "src/types/global";
import { useState, useMemo } from "react";

interface SubCategorySelectProps {
  propertyEnums: IGlobalProperty;
}

export default function SubCategorySelect(props: SubCategorySelectProps) {
  const { propertyEnums } = props;

  const dispatch = useDispatch();
  const selectedCategory: string | undefined = useSelector(selectCategory);
  const [subCategoryFilterOptions, setSubCategoryFilterOptions] = useState([
    { value: "ALL", label: "All Categories" },
  ]);

  useMemo(() => {
    if (!selectedCategory) return null;

    const subCategoriesMap: {
      [key: string]: string[];
    } = {
      Residential: propertyEnums.residentialCategory,
      Commercial: propertyEnums.commercialCategory,
      Land: propertyEnums.landCategory,
      Other: propertyEnums.otherCategory,
    };

    setSubCategoryFilterOptions([
      { value: "ALL", label: "All Categories" },
      ...subCategoriesMap[selectedCategory].map((subCategory: string) => {
        return {
          value: subCategory,
          label: subCategory,
        };
      }),
    ]);
  }, [
    propertyEnums.residentialCategory,
    propertyEnums.commercialCategory,
    propertyEnums.landCategory,
    propertyEnums.otherCategory,
    selectedCategory,
  ]);

  if (!propertyEnums) return null;

  return (
    <Autocomplete
      sx={{ width: 180 }}
      id="select-demo"
      options={subCategoryFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) =>
        dispatch(setSubCategory(newValue?.value || ""))
      }
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.label}
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
