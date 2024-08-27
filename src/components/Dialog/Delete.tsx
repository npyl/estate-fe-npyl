import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import SoftButton from "@/components/SoftButton";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { HighlightOff as HighlightOffIcon } from "@mui/icons-material";

const DeleteIcon = styled(HighlightOffIcon)(({ theme }) => ({
    fontSize: "100px",
    stroke:
        theme.palette.mode === "dark" ? theme.palette.neutral?.[900] : "Window",
    strokeWidth: 1.5,
    color: theme.palette.error.main,
}));

interface DeleteDialogProps {
    open: boolean;
    multiple?: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteDialog = ({
    open,
    multiple = false,
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
                <DeleteIcon />
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight={400}>
                    {t("Are you sure?")}
                </Typography>
            </DialogContent>
            <DialogContentText ml={3} mr={3} sx={{ textAlign: "center" }}>
                {multiple
                    ? t("Do you really want to delete these records?")
                    : t("Do you really want to delete this record?")}
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

export default DeleteDialog;
