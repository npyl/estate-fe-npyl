import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import type { FC } from "react";
import { useState } from "react";
import { Search as SearchIcon } from "../../icons/search";
import { StyledNavbarSearchPaper } from "./styles";

export const DashboardNavbarSearch: FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <StyledNavbarSearchPaper>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search with a keyword'
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        disableRipple
        type='button'
        sx={{ p: "10px" }}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
    </StyledNavbarSearchPaper>
  );
};
