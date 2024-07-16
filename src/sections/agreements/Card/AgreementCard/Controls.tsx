import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";

interface ControlsProps {
    onEdit: VoidFunction;
    onDelete: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({ onEdit, onDelete }) => {
    // TODO: share
    return (
        <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            className="AgreementCardButtons"
        >
            <IconButton onClick={onEdit}>
                <EditIcon />
            </IconButton>
            <IconButton>
                <ShareIcon />
            </IconButton>
            <IconButton color="error" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};

export default Controls;
