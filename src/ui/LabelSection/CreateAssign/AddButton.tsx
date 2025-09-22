import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { LabelResourceType } from "src/types/label";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
const AddLabelDialog = dynamic(() => import("./Dialog"));

interface AddButtonProps {
    variant: LabelResourceType;
    resourceId?: number; // > 0 valid, undefined invalid
    disabled?: boolean;
    loading?: boolean;
}

const AddButton: FC<AddButtonProps> = ({
    variant,
    resourceId,
    // ...
    disabled,
    loading,
}) => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    const handleOpenDialog = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            openDialog();
        },
        []
    );

    return (
        <>
            <IconButton
                size="small"
                onClick={handleOpenDialog}
                disabled={disabled || loading}
            >
                <AddCircleIcon />
            </IconButton>

            {isOpen ? (
                <AddLabelDialog
                    resourceId={resourceId}
                    variant={variant}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};

export default AddButton;
