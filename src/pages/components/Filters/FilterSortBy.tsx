import {
  Autocomplete,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface IFilterSortByProps {
  onSorting: (sortingBy: string, sortingOrder: string) => void;
}

export default function FilterSortBy({ onSorting }: IFilterSortByProps) {
  const sortByFilterOptions = [
    { value: "", label: "Προεπιλογή" },
    {
      value: "Ascending_Price",
      label: "Αύξουσα Τιμή",
    },
    {
      value: "Descending_Price",
      label: "Φθίνουσα Τιμή",
    },
    {
      value: "Ascending_Area",
      label: "Αύξον Μέγεθος",
    },
    {
      value: "Descending_Area",
      label: "Φθίνον Μέγεθος",
    },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <Autocomplete
      sx={{
        width: 100,
        "& .MuiAutocomplete-paper": {
          width: 400,
        },
      }}
      id='select-demo'
      componentsProps={{ popper: { style: { width: "200px" } } }}
      options={sortByFilterOptions}
      autoHighlight
      clearIcon={false}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <FormControlLabel
          control={
            <Radio checked={selectedOption === option.value} size='small' />
          }
          label={option.label}
          sx={{ p: 1, width: "100%" }}
          onClick={() => {
            setSelectedOption(option?.value || "");

            if (option?.value === sortByFilterOptions[0].value) {
              onSorting("", "");
            } else if (option?.value === sortByFilterOptions[1].value) {
              onSorting("price", "asc");
            } else if (option?.value === sortByFilterOptions[2].value) {
              onSorting("price", "desc");
            } else if (option?.value === sortByFilterOptions[3].value) {
              onSorting("area", "asc");
            } else if (option?.value === sortByFilterOptions[4].value) {
              onSorting("price", "desc");
            }
          }}
        />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='Sort By'
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
