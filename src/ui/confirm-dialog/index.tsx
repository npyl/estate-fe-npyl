import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import stopPropagation from "@/utils/stopPropagation";
import { FC } from "react";
import Dialog, { DialogProps } from "@/components/Dialog";

interface ConfirmDialogProps extends Omit<DialogProps, "title" | "onClose"> {
    title: string;
    onClose: VoidFunction;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ actions, ...other }) => {
    const { t } = useTranslation();
    return (
        <Dialog
            fullWidth
            onClick={stopPropagation}
            actions={
                <>
                    <Button color="inherit" onClick={other.onClose}>
                        {t("Close")}
                    </Button>

                    {actions}
                </>
            }
            {...other}
        />
    );
};

export type { ConfirmDialogProps };
export default ConfirmDialog;
