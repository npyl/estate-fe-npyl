import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    DialogActions,
    DialogContentText,
    Typography,
} from "@mui/material";

import { HighlightOff as HighlightOffIcon } from "@mui/icons-material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import { useTranslation } from "react-i18next";

interface IConfirmationDialogBox {
    open: boolean;
    text: string;
    action: string;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationDialogBox: React.FC<IConfirmationDialogBox> = (props) => {
    const { open, onClose, text, action, onConfirm } = props;
    const { t } = useTranslation();

    return (
        <Dialog
            maxWidth="xs"
            open={open}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle sx={{ textAlign: "center" }}>
                {action === "delete" ? ( // Check if the action prop is 'delete'
                    <HighlightOffIcon
                        sx={{
                            fontSize: "100px",
                            stroke: "Window",
                            strokeWidth: 1.5,
                            color: "error.main",
                        }}
                    />
                ) : action === "clone" ? ( // Check if the action prop is 'clone'
                    <CopyAllIcon
                        sx={{
                            fontSize: "100px",
                            stroke: "Window",
                            strokeWidth: 1.5,
                            color: "error.main",
                        }}
                    />
                ) : (
                    <CrisisAlertIcon
                        sx={{
                            fontSize: "100px",
                            stroke: "Window",
                            strokeWidth: 1.5,
                            color: "error.main",
                        }}
                    />
                )}
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight={400}>
                    Are you sure?
                </Typography>
            </DialogContent>
            <DialogContentText ml={3} mr={3} sx={{ textAlign: "center" }}>
                {text}
                <br />
                {action === "delete" // Check if the action prop is 'delete'
                    ? "This process cannot be undone"
                    : ""}
            </DialogContentText>
            <DialogActions
                sx={{
                    float: "right",
                }}
            >
                <Stack direction={"row"} justifyContent={"right"} spacing={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onClose}
                    >
                        {t("Cancel")}
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialogBox;
