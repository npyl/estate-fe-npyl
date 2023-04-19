import { Paper, styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledNavbarSearch = styled(DataGrid)(({ theme }) => ({}));

export const StyledNavbarSearchPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.neutral![100],
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 300,
  borderRadius: "35px",
  border: `0.5px solid ${theme.palette.neutral![100]}`,

  "&:hover": {
    border: `0.5px solid ${theme.palette.primary.main}`,
  },
}));
