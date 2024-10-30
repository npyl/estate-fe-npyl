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
// ----------------------------------------------------------------------

export default function ConfirmDialog({
    title,
    content,
    action,
    ...other
}: ConfirmDialogProps) {
    const { t } = useTranslation();
    return (
        <Dialog fullWidth maxWidth="xs" {...other}>
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
}
