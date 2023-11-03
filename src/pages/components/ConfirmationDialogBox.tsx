import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    DialogActions,
} from "@mui/material";

interface IConfirmationDialogBox {
    open: boolean;
    text: string;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmationDialogBox: React.FC<IConfirmationDialogBox> = (props) => {
    const { open, onClose, text, onConfirm } = props;
    

    return (
        <Dialog
            fullWidth
            open={open}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        minWidth: "60vw",
                    },
                },
            }}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogContent sx={{ padding: "0" }}>
                <div style={{padding:"1rem 1.5rem"}}>
                    <h2>
                        {text}
                    </h2>
                </div>
            </DialogContent>
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
                        Cancel
                    </Button>
                </Stack>
            </DialogActions>
        </Dialog>
    );
};
