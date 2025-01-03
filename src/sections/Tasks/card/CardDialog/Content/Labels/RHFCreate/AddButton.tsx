import useDialog from "@/hooks/useDialog";
import { ILabel } from "@/types/label";
import AddIcon from "@mui/icons-material/Add";
import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import LoadingIconButton from "@/components/LoadingIconButton";
const AddLabelDialog = dynamic(() => import("@/sections/LabelCreate/Dialog"));

const AddButton = () => {
    const [isOpen, openDialog, closeDialog] = useDialog();

    const { setValue } = useFormContext();

    const old = useWatch({ name: "labels" });
    const handleCreate = useCallback(
        (newId: number) =>
            setValue("labels", [...old, newId], { shouldDirty: true }),
        [old]
    );

    const handleLabelClick = (l: ILabel) => handleCreate(l.id);

    return (
        <>
            <LoadingIconButton onClick={openDialog} size="small">
                <AddIcon />
            </LoadingIconButton>

            {isOpen ? (
                <AddLabelDialog
                    variant="ticket"
                    onClose={closeDialog}
                    onLabelClick={handleLabelClick}
                    onCreate={handleCreate}
                />
            ) : null}
        </>
    );
};

export default AddButton;
