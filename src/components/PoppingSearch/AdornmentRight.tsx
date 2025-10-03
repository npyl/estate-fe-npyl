import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import { FC } from "react";

interface Props {
    onClick: VoidFunction;
}

const AdornmentRight: FC<Props> = ({ onClick }) => (
    <InputAdornment position="end">
        <IconButton onClick={onClick}>
            <ClearIcon />
        </IconButton>
    </InputAdornment>
);

export default AdornmentRight;
