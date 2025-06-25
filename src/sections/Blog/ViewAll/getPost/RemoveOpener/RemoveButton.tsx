import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { FC, MouseEvent, useCallback } from "react";

interface RemoveButtonProps {
    onClick: VoidFunction;
}

const RemoveButton: FC<RemoveButtonProps> = ({ onClick: _onClick }) => {
    const onClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            _onClick();
        },
        [_onClick]
    );
    return (
        <IconButton onClick={onClick}>
            <DeleteIcon />
        </IconButton>
    );
};

export default RemoveButton;
