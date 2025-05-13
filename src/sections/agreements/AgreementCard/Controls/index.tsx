import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import React, { FC, MouseEvent } from "react";
import ShareButton from "./Share";
import ExportButton from "./Export";
import DeleteButton from "./Delete";

const stopPropagation = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
};

interface ControlsProps {
    agreementId: number;
    onEdit: VoidFunction;
}

const Controls: React.FC<ControlsProps> = ({ agreementId, onEdit }) => (
    <Stack
        className="AgreementCardButtons"
        spacing={1}
        direction="row"
        // ...
        position="absolute"
        bottom={0}
        right={0}
        onClick={stopPropagation}
    >
        <IconButton onClick={onEdit}>
            <EditIcon />
        </IconButton>
        <ShareButton agreementId={agreementId} />
        <ExportButton agreementId={agreementId} />
        <DeleteButton agreementId={agreementId} />
    </Stack>
);

export default Controls;
