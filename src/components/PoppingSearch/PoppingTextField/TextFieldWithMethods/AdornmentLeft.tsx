import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material";

const StyledAdornment = styled(InputAdornment)(({ theme }) => ({
    padding: theme.spacing(1),
}));

const AdornmentLeft = () => (
    <StyledAdornment position="start">
        <SearchIcon />
    </StyledAdornment>
);

export default AdornmentLeft;
