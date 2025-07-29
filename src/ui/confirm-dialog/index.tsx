// @mui
import { Button } from "@mui/material";
//
import { ConfirmDialogProps } from "./types";
import { useTranslation } from "react-i18next";
import stopPropagation from "@/utils/stopPropagation";
import { FC } from "react";
import Dialog from "@/components/Dialog";
// ----------------------------------------------------------------------

const ConfirmDialog: FC<ConfirmDialogProps> = ({ actions, ...other }) => {
    const { t } = useTranslation();
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
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

export default ConfirmDialog;
