import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface PDFViewerProps {
    open: boolean;
    url: string;
    onClose: () => void;
}

const PDFViewer = ({ open, url, onClose }: PDFViewerProps) => {
    return open ? (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        minWidth: "80vw",
                        minHeight: "80vh",
                    },
                },
            }}
        >
            <DialogTitle>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    Documents
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: "grey",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <iframe
                    src={url}
                    style={{ border: "none", width: "100%", height: "100vh" }}
                />
            </DialogContent>
        </Dialog>
    ) : null;
};

export default PDFViewer;
