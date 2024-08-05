import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";

const SearchInput = styled(InputBase)(({ theme }) => ({
    borderRadius: 24,
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
    "&:focus": {
        borderColor: theme.palette.primary.main,
    },
    height: "50px",
}));

export default SearchInput;
