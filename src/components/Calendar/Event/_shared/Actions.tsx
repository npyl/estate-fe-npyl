import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, useCallback } from "react";

const HoverButtonsSx: SxProps<Theme> = {
    position: "absolute",

    top: 4,
    right: 4,

    opacity: 0,

    pointerEvents: "none",

    transition: "opacity 0.3s ease",

    borderRadius: "8px",
    padding: "2px",

    "& .MuiIconButton-root": {
        padding: "4px",
    },
};

interface ActionsProps {
    eventId: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const Actions: FC<ActionsProps> = ({ eventId, onEdit, onDelete }) => {
    const handleEdit = useCallback(() => onEdit?.(eventId), [onEdit]);
    const handleDelete = useCallback(() => onDelete?.(eventId), [onDelete]);

    return (
        <Box className="Calendar-Event-Action-Buttons" sx={HoverButtonsSx}>
            <IconButton color="info" onClick={handleEdit}>
                <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default Actions;
