import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { setCategory } from "src/slices/filters";
import { useDispatch } from "react-redux";

import { IGlobalProperty } from "src/types/global";

interface CategorySelectProps {
  propertyEnums: IGlobalProperty;
}

export default function CategorySelect(props: CategorySelectProps) {
  const dispatch = useDispatch();

  const { propertyEnums } = props;
  const categoryEnums = propertyEnums?.parentCategory;

  if (!propertyEnums || !categoryEnums) return null;

  const categoryFilterOptions = [
    { value: "ALL", label: "All Categories" },
    ...categoryEnums.map((category) => ({ value: category, label: category })),
  ];

  return (
    <Autocomplete
      sx={{ width: 180 }}
      id="select-demo"
      options={categoryFilterOptions}
      autoHighlight
      clearIcon={false}
      onChange={(_e, newValue) => dispatch(setCategory(newValue?.value || ""))}
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
          placeholder="Κατηγορία"
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
