import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Box, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveFab from "./SaveFab";
import PDFEditor from "./Editor";
import { useFormContext } from "react-hook-form";
import ErrorTooltips from "./ErrorTooltips";

const TRIGGER_OPTIONS = ["owner", "property", "commissionAndDuration", "gdpr"];

interface Props extends Omit<DialogProps, "onClose"> {
    onClose: VoidFunction;
}

const PDFEditorDialog: React.FC<Props> = (props) => {
    const { trigger } = useFormContext();

    const handleSave = async () => {
        const res = await trigger(TRIGGER_OPTIONS);

        if (res) {
            // we are ok; close the dialog
            props.onClose();
        }
    };

    return (
        <Box position="relative">
            <Dialog {...props} fullScreen>
                <PDFEditor />
            </Dialog>

            <ErrorTooltips />

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
            <SaveFab
                position="fixed"
                bottom={30}
                right={30}
                zIndex={1500}
                onClick={handleSave}
            />
        </Box>
    );
};

export default PDFEditorDialog;
