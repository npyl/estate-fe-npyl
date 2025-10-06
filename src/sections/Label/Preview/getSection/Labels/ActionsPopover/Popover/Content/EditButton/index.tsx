import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { LabelResourceType } from "@/types/label";
import { FC } from "react";
import useDialog from "@/hooks/useDialog";
import EditDialog from "./EditDialog";

interface EditButtonProps {
    resource: LabelResourceType;
    labelId: number;
}

const EditButton: FC<EditButtonProps> = ({ resource, labelId }) => {
    const [isOpen, open, close] = useDialog();

    return (
        <>
            <IconButton onClick={open}>
                <EditIcon fontSize="small" />
            </IconButton>

            {isOpen ? (
                <EditDialog
                    resource={resource}
                    labelId={labelId}
                    onCancel={close}
                />
            ) : null}
        </>
    );
};

export default EditButton;
