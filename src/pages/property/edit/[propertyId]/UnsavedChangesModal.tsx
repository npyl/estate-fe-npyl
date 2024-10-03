import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";

interface UnsavedChangesModalProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function UnsavedChangesModal({
    open,
    onConfirm,
    onCancel,
}: UnsavedChangesModalProps) {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    pt={2}
                    pl={1}
                >
                    {/* Changed the color of the SaveIcon */}
                    <SaveIcon sx={{ color: "primary.main" }} />
                    {t("Unsaved Changes")}
                </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ textAlign: "center", mt: 1 }}>
                    {t(
                        "You have unsaved changes.  All your progress will be lost if you leave without saving. Are you sure you want to leave this page?"
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack
                    direction="row"
                    spacing={2}
                    p={1}
                    justifyContent="center"
                    width="100%"
                >
                    <Button
                        onClick={onConfirm}
                        color="error"
                        variant="outlined"
                    >
                        {t("Yes")}
                    </Button>
                    <Button
                        onClick={onCancel}
                        variant="contained"
                        startIcon={<CancelIcon />}
                    >
                        {t("No")}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
}
