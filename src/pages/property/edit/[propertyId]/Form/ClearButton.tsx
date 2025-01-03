import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
const ConfirmationDialogBox = dynamic(
    () => import("@/sections/ConfirmationDialogBox")
);
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";

const ClearButton = () => {
    const { t } = useTranslation();

    const { reset } = useFormContext();

    const [isOpen, openDialog, closeDialog] = useDialog();

    const handleConfirm = () => {
        reset();
        closeDialog();
    };

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={openDialog}
            >
                {t("Clear")}
            </Button>

            {isOpen ? (
                <ConfirmationDialogBox
                    action="delete"
                    open
                    onClose={closeDialog}
                    text="Are you sure you want to clear all fields?"
                    onConfirm={handleConfirm}
                />
            ) : null}
        </>
    );
};

export default ClearButton;
