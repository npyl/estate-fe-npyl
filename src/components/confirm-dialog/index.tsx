// @mui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
//
import { ConfirmDialogProps } from "./types";
import { useTranslation } from "react-i18next";
import stopPropagation from "@/utils/stopPropagation";
import { FC } from "react";
// ----------------------------------------------------------------------

const ConfirmDialog: FC<ConfirmDialogProps> = ({
    title,
    content,
    action,
    ...other
}) => {
    const { t } = useTranslation();
    return (
        <Dialog fullWidth maxWidth="xs" onClick={stopPropagation} {...other}>
            <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

            {content && (
                <DialogContent sx={{ typography: "body2" }}>
                    {" "}
                    {content}{" "}
                </DialogContent>
            )}

            <DialogActions>
                {action}

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={other.onClose}
                >
                    {t("Close")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
