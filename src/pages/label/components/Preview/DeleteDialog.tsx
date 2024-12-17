import {
    useDeleteCustomerLabelMutation,
    useDeleteDocumentLabelMutation,
    useDeletePropertyLabelMutation,
} from "@/services/labels";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { LabelResourceType } from "@/types/label";
const ConfirmationDialogBox = dynamic(
    () => import("@/sections/ConfirmationDialogBox")
);

// --------------------------------------------------------------------------

const useDeleteCb = (variant: LabelResourceType) => {
    const [deleteLabelForProperties] = useDeletePropertyLabelMutation();
    const [deleteLabelForCustomers] = useDeleteCustomerLabelMutation();
    const [deleteLabelForDocuments] = useDeleteDocumentLabelMutation();

    const cb =
        variant === "property"
            ? deleteLabelForProperties
            : variant === "customer"
            ? deleteLabelForCustomers
            : variant === "document"
            ? deleteLabelForDocuments
            : () => {};

    return { cb };
};

// --------------------------------------------------------------------------

interface DeleteDialogProps {
    variant: LabelResourceType;
    labelId: number;
    onClose: VoidFunction;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ variant, labelId, onClose }) => {
    const { t } = useTranslation();

    const { cb } = useDeleteCb(variant);

    const handleConfirm = async () => {
        await cb(labelId);
        onClose();
    };

    return (
        <ConfirmationDialogBox
            open
            onClose={onClose}
            text={t("Are you Sure You want to Delete This Label?")}
            onConfirm={handleConfirm}
            action={"delete"}
        />
    );
};

export default DeleteDialog;
