import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import { FC, MouseEvent, useCallback } from "react";

interface Props {
    onClose: VoidFunction;
    onClear: VoidFunction;
}

const AdornmentRight: FC<Props> = ({ onClear, onClose }) => {
    const onClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onClear();
            onClose();
        },
        [onClear, onClose]
    );
    return (
        <InputAdornment position="end" onClick={onClick}>
            <IconButton>
                <ClearIcon />
            </IconButton>
        </InputAdornment>
    );
};

export default AdornmentRight;
