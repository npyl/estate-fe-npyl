import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function FilterRows() {
  const rowsOptions = [
    {
      value: 25,
      label: "25 ανά σελίδα",
    },
    {
      value: 50,
      label: "50 ανά σελίδα",
    },
    {
      value: 100,
      label: "100 ανά σελίδα",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(25);

  return (
    <Select
      value={selectedOption}
      onChange={(event) => setSelectedOption(+event.target.value)}
    >
      {rowsOptions.map((row) => (
        <MenuItem key={row.value} value={row.value}>
          {row.label}
        </MenuItem>
      ))}
    </Select>
  );
}
