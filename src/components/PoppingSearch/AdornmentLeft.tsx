import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material";
import { FC } from "react";

const StyledAdornment = styled(InputAdornment)(({ theme }) => ({
    padding: theme.spacing(1),
}));

interface Props {
    onClick: VoidFunction;
}

const AdornmentLeft: FC<Props> = ({ onClick }) => (
    <StyledAdornment position="start" onClick={onClick}>
        <SearchIcon />
    </StyledAdornment>
);

export default AdornmentLeft;
