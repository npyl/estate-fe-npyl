import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Box, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveFab from "./SaveFab";
import PDFEditor from "./Editor";

interface Props extends Omit<DialogProps, "onClose"> {
    onClose: VoidFunction;
    variant: "basic" | "purchase";
}

const PDFEditorDialog: React.FC<Props> = (props) => (
    <Box position="relative">
        <Dialog {...props} fullScreen>
            <PDFEditor />
        </Dialog>

        {/* Close */}
        <Fab
            sx={{
                position: "fixed",
                top: 30,
                right: 30,
                zIndex: 1500,
            }}
            onClick={props.onClose}
        >
            <CloseIcon />
        </Fab>

        {/* Save */}
        <SaveFab position="fixed" bottom={30} right={30} zIndex={1500} />
    </Box>
);

export default PDFEditorDialog;
