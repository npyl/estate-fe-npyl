import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Box, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveFab from "./SaveFab";
import ErrorTooltips from "./ErrorTooltips";
import useValidatePDF from "./useValidatePDF";
import dynamic from "next/dynamic";
import { Z_INDEX } from "@/config";
const PDFEditor = dynamic(() => import("./Editor"));
const SuggestProperties = dynamic(() => import("./SuggestProperties"));

interface Props extends Omit<DialogProps, "onClose"> {
    suggestProperties: boolean;
    onClose: VoidFunction;
}

const PDFEditorDialog: React.FC<Props> = ({ suggestProperties, ...props }) => {
    const { validate } = useValidatePDF();

    const handleSave = async () => {
        const res = await validate();

        if (res) {
            // we are ok; close the dialog
            props.onClose();
        }
    };

    return (
        <Box position="relative">
            <Dialog {...props} fullScreen>
                <PDFEditor>
                    {suggestProperties ? <SuggestProperties /> : null}
                </PDFEditor>
            </Dialog>

            <ErrorTooltips />

            {/* Close */}
            <Fab
                sx={{
                    position: "fixed",
                    top: 30,
                    right: 30,
                    zIndex: Z_INDEX.AGREEMENT_FORM,
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
                zIndex={Z_INDEX.AGREEMENT_FORM}
                onClick={handleSave}
            />
        </Box>
    );
};

export default PDFEditorDialog;
