import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { SoftButton } from "../SoftButton";
import { useTranslation } from "react-i18next";

import { HighlightOff as HighlightOffIcon } from "@mui/icons-material";

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export const DeleteDialog = ({
    open,
    onClose,
    onDelete,
}: DeleteDialogProps) => {
    const { t } = useTranslation();

    return (
        <Dialog
            maxWidth="xs"
            open={open}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle sx={{ textAlign: "center" }}>
                <HighlightOffIcon
                    sx={{
                        fontSize: "100px",
                        stroke: "Window",
                        strokeWidth: 1.5,
                        color: "error.main",
                    }}
                />
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight={400}>
                    {t("Are you sure?")}
                </Typography>
            </DialogContent>
            <DialogContentText ml={3} mr={3} sx={{ textAlign: "center" }}>
                {t("Do you really want to delete this record?")}
                <br />
                {t("This process cannot be undone")}
            </DialogContentText>
            <DialogContent sx={{ textAlign: "center" }}>
                <Button
                    sx={{ mr: 1 }}
                    variant="outlined"
                    color="secondary"
                    onClick={onClose}
                >
                    {t("No")}
                </Button>

                <SoftButton color="error" onClick={onDelete}>
                    {t("Yes")}
                </SoftButton>
            </DialogContent>
        </Dialog>
    );
};
