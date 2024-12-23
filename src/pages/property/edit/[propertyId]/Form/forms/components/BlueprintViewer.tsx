import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Image from "src/components/image";

interface BlueprintViewerProps {
    open: boolean;
    url: string;
    onClose: () => void;
}

export const BlueprintViewer = ({
    open,
    url,
    onClose,
}: BlueprintViewerProps) => {
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
            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: 1,
                    borderRadius: 1,
                }}
            >
                <Box width={"50%"}>
                    <Image src={url} ratio="16/9" />
                </Box>
            </DialogContent>
        </Dialog>
    ) : null;
};
