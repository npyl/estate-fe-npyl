import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Box, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveFab from "./SaveFab";
import PDFEditor from "./Editor";
import { IAgreementType } from "@/types/agreements";
import { TLanguageType } from "@/types/translation";

interface Props extends Omit<DialogProps, "onClose"> {
    onClose: VoidFunction;
    variant: IAgreementType;
    lang: TLanguageType;
}

const PDFEditorDialog: React.FC<Props> = ({ variant, lang, ...props }) => (
    <Box position="relative">
        <Dialog {...props} fullScreen>
            <PDFEditor variant={variant} lang={lang} />
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
