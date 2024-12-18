import { useDeleteLabelForResourceMutation } from "@/services/labels";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { LabelResourceType } from "@/types/label";
const ConfirmationDialogBox = dynamic(
    () => import("@/sections/ConfirmationDialogBox")
);

// --------------------------------------------------------------------------

interface DeleteDialogProps {
    resource: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
    resource,
    labelId,
    onClose,
}) => {
    const { t } = useTranslation();

    const [deleteForResource] = useDeleteLabelForResourceMutation();

    const handleConfirm = async () => {
        await deleteForResource({ resource, labelId });
        onClose();
    };

    return (
        <ConfirmationDialogBox
            open
            onClose={onClose}
            text={t("_UNDONE_")}
            onConfirm={handleConfirm}
            action={"delete"}
        />
    );
};

export default DeleteDialog;
