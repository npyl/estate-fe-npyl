import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IAgreementShort } from "@/types/agreements";
import React, { MouseEvent } from "react";
import ShareButton from "./Share";
import ExportButton from "./Export";

// ------------------------------------------------------------

interface ControlsProps {
    agreement: IAgreementShort;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({ agreement, onEdit, onDelete }) => {
    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onEdit();
    };
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onDelete();
    };

    return (
        <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            className="AgreementCardButtons"
        >
            <IconButton onClick={handleEdit}>
                <EditIcon />
            </IconButton>
            <ShareButton agreement={agreement} />
            <ExportButton agreementId={agreement.id} />
            <IconButton color="error" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};

export default Controls;
