import EditIcon from "@mui/icons-material/Edit";
import { LabelResourceType } from "@/types/label";
import { FC, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import EditDialog from "./EditDialog";
import RoundIconButton from "@/components/RoundIconButton";

interface EditButtonProps {
    resource: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const EditButton: FC<EditButtonProps> = ({
    resource,
    labelId,
    onClose: _onClose,
}) => {
    const [isOpen, open, close] = useDialog();
    const onClose = useCallback(() => {
        close();
        _onClose();
    }, [_onClose]);

    return (
        <>
            <RoundIconButton onClick={open}>
                <EditIcon fontSize="small" />
            </RoundIconButton>

            {isOpen ? (
                <EditDialog
                    resource={resource}
                    labelId={labelId}
                    onCancel={onClose}
                />
            ) : null}
        </>
    );
};

export default EditButton;
