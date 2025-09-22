import { Paper } from "@mui/material";
import { IEditProps } from "./Preview/types";
import LabelForm from "@/ui/Label/Form";

interface EditProps {
    editedLabel: IEditProps;
    cancelEdit: () => void;
}

const Edit = ({ editedLabel, cancelEdit }: EditProps) => {
    const { resource } = editedLabel || {};

    return (
        <Paper
            sx={{
                p: 3,
            }}
            elevation={3}
        >
            <LabelForm
                resource={resource}
                label={editedLabel}
                onCancel={cancelEdit}
            />
        </Paper>
    );
};

export default Edit;
