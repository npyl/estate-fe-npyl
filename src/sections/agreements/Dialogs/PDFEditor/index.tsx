import React, { FC } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Box, Fab, SxProps, Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveFab from "./SaveFab";
import ErrorTooltips from "./ErrorTooltips";
import useValidatePDF from "./useValidatePDF";
import dynamic from "next/dynamic";
const PDFEditor = dynamic(() => import("./Editor"), { ssr: false });
const SuggestProperties = dynamic(() => import("./SuggestProperties"));

// --------------------------------------------------------------------------------------------

const getZIndex = ({ zIndex }: Theme) => zIndex.modal;

// --------------------------------------------------------------------------------------------

const CloseFabSx: SxProps<Theme> = {
    position: "fixed",
    top: 30,
    right: 30,
    zIndex: getZIndex,
};

interface CloseFabProps {
    onClick: VoidFunction;
}

const CloseFab: FC<CloseFabProps> = ({ onClick }) => (
    <Fab sx={CloseFabSx} onClick={onClick}>
        <CloseIcon />
    </Fab>
);

// --------------------------------------------------------------------------------------------

interface Props extends Omit<DialogProps, "open" | "onClose"> {
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
        <Dialog open {...props} fullScreen>
            <Box position="relative">
                <PDFEditor>
                    {suggestProperties ? <SuggestProperties /> : null}
                </PDFEditor>

                <ErrorTooltips />

                {/* Close */}
                <CloseFab onClick={props.onClose} />

                {/* Save */}
                <SaveFab
                    position="fixed"
                    bottom={30}
                    right={30}
                    zIndex={getZIndex}
                    onClick={handleSave}
                />
            </Box>
        </Dialog>
    );
};

export default PDFEditorDialog;
