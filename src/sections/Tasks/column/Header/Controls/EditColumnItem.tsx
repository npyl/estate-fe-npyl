import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import useDialog from "@/hooks/useDialog";
import AddOrEditDialog from "@/sections/Tasks/column/AddDialog";
import { FC } from "react";

interface EditColumnItemProps {
    columnId: number;
}

const EditColumnItem: FC<EditColumnItemProps> = ({ columnId }) => {
    const { t } = useTranslation();

    const [isOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <MenuItem onClick={openDialog}>{t("Edit")}</MenuItem>

            {isOpen ? (
                <AddOrEditDialog columnId={columnId} onClose={closeDialog} />
            ) : null}
        </>
    );
};

export default EditColumnItem;
